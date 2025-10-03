<template>
  <div class="game-scratcher">
    
    <div class="scratcher">
      <canvas :id="scratcher.scratchId" class="myCanvas"
        :width="`${windowWidth* .9}`"
        :height="`${windowWidth * .9}`"

        :style="`margin:0;
          ${revealMe}`">
      </canvas>
    </div>
    <br/><br/>
 
  </div>
</template>

<script>

export default {
  name: 'GameScratcher',
  data: () => ({
    scratcher: {
      scratchId: 'testing1',
      revealMe: null,
      coverUp: process.env.VUE_APP_IMAGE_ROOT +'lpuEkSePpwewsvqsCtzvqRMz/cover.png'
    },
    reveal: null,
    revealCanvas: null,
    brushRadius: 0,
    revealRect: null,
    img: null,
    ticket: null,
    mygrid: [],
    revealMe: null,
    scratchedCells: new Map(), // Changed to Map to track coverage amount
    gridSize: 20, // Increased for better accuracy
    isComplete: false,

  }),
  async mounted () {
    this.reveal = document.getElementById(this.scratcher.scratchId)
    this.revealRect = this.reveal.getBoundingClientRect()
    this.revealCanvas = this.reveal.getContext('2d')

    this.reveal.addEventListener("mousemove", (e) => {
      let brushPos = this.getBrushPos(e.clientX, e.clientY, this.revealRect, this.reveal)
      let leftBut = this.detectLeftButton(e)
      if (leftBut == 1) {
        this.drawDotMouse(brushPos.x, brushPos.y, this.revealCanvas, this.brushRadius, this.revealRect)
      }
    }, false)

    this.reveal.addEventListener("touchmove", (e) => {
      e.preventDefault()
      let touch = e.targetTouches[0]
      if (touch) {
        let brushPos = this.getBrushPos(touch.pageX, touch.pageY, this.revealRect, this.reveal)
        this.drawDotTouch(brushPos.x, brushPos.y, this.revealCanvas, this.brushRadius, this.revealRect)
      }
    }, false)

    try {
      await this.resetScratcher()
    } catch (e) {
      this.debug(e)
    }

  },
  methods: {
    initTicket () {
      this.revealCanvas.save()
      this.brushRadius = (this.reveal.width / 100) * 10
      this.scratchedCells.clear()
      this.isComplete = false
      console.log(this.brushRadius)
    },

    calcMargin() {
      return this.windowWidth * .05
    },

    async nextScratcher () {
      this.resetScratcher()
      this.$emit('next')
    },

    async resetScratcher() {
      this.revealCanvas.restore()
      try {
        
        
        this.img = new Image()
        this.img.alt = `Scratcher Overlay ${this.scratcher.scratchId}`
        
        this.img.onload = () => {
          let prize = `${this.imageRoot}lpuEkSePpwewsvqsCtzvqRMz/reveal.png`
    
          this.revealCanvas.drawImage(this.img, 0, 0, this.reveal.width, this.reveal.height)
          this.revealMe = `visibility: visible; background-image: url('${prize}'); background-image: -webkit-image-set(url('${prize}') 1x, url('${prize}') 2x );`
          this.initTicket()
        }
        this.img.src = this.scratcher.coverUp

      } catch (err) {
        console.log(err)
      }
    },

    detectLeftButton (event) {
      if ('buttons' in event) {
        return event.buttons === 1
      } else if ('which' in event) {
        return event.which === 1
      } else {
        return event.button === 1
      }
		},

		getBrushPos (xRef, yRef, revealRect, reveal) {
      return {
        x: Math.floor((xRef - revealRect.left) / (revealRect.right - revealRect.left) * reveal.width),
        y: Math.floor((yRef - revealRect.top) / (revealRect.bottom - revealRect.top) * reveal.height)
      };
		},

    drawDotMouse (mouseX,mouseY,revealCanvas, brushRadius, rect) {
      if(rect) { /*do nothing */}
      if(mouseX >= 0 && mouseX <= 50 && mouseY >= 0 && mouseY <= 50) {
        console.log('top corner')
      }
      
      // Mark grid cells affected by this brush stroke
      this.markGridCells(mouseX, mouseY - 50, brushRadius)
      
      revealCanvas.beginPath()
      revealCanvas.arc(mouseX, mouseY-50, brushRadius, 0, 2*Math.PI, true)
      revealCanvas.fillStyle = '#000'
      revealCanvas.globalCompositeOperation = "destination-out"
      revealCanvas.fill()
      this.checkScratchProgress()
		},

    drawDotTouch (mouseX,mouseY,revealCanvas, brushRadius, rect) {
      if(rect) { /*do nothing */}
      if(mouseX >= 0 && mouseX <= 50 && mouseY >= 0 && mouseY <= 50) {
        console.log('top corner')
      }
      
      // Mark grid cells affected by this brush stroke
      this.markGridCells(mouseX, mouseY, brushRadius)
      
      revealCanvas.beginPath()
      revealCanvas.arc(mouseX, mouseY, brushRadius, 0, 2*Math.PI, true)
      revealCanvas.fillStyle = '#000'
      revealCanvas.globalCompositeOperation = "destination-out"
      revealCanvas.fill()
      this.checkScratchProgress()
		},

    markGridCells(centerX, centerY, brushRadius, coverageAmount = 25) {
      const cellWidth = this.reveal.width / this.gridSize
      const cellHeight = this.reveal.height / this.gridSize
      
      // Calculate which grid cells are affected by the brush circle
      const minX = Math.max(0, centerX - brushRadius)
      const maxX = Math.min(this.reveal.width, centerX + brushRadius)
      const minY = Math.max(0, centerY - brushRadius)
      const maxY = Math.min(this.reveal.height, centerY + brushRadius)
      
      const startCol = Math.floor(minX / cellWidth)
      const endCol = Math.floor(maxX / cellWidth)
      const startRow = Math.floor(minY / cellHeight)
      const endRow = Math.floor(maxY / cellHeight)
      
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const cellId = `${row}-${col}`
          const cellCenterX = col * cellWidth + cellWidth / 2
          const cellCenterY = row * cellHeight + cellHeight / 2
          
          // Calculate distance from brush center to cell center
          const distance = Math.sqrt(
            Math.pow(centerX - cellCenterX, 2) + Math.pow(centerY - cellCenterY, 2)
          )
          
          // Only mark cells that are significantly covered by the brush
          if (distance <= brushRadius * 0.7) { // Cell center must be within 70% of brush radius
            const currentCoverage = this.scratchedCells.get(cellId) || 0
            const newCoverage = Math.min(100, currentCoverage + coverageAmount)
            this.scratchedCells.set(cellId, newCoverage)
          }
        }
      }
    },

    checkScratchProgress() {
      const totalCells = this.gridSize * this.gridSize
      let fullyCoveredCells = 0
      
      // Count cells that are at least 75% covered
      this.scratchedCells.forEach((coverage) => {
        if (coverage >= 75) {
          fullyCoveredCells++
        }
      })
      
      const scratchedPercentage = (fullyCoveredCells / totalCells) * 100
      
      // Different completion thresholds for mobile vs desktop
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const completionThreshold = isMobile ? 75 : 80
      
      console.log(`Scratched: ${scratchedPercentage.toFixed(1)}% (${fullyCoveredCells}/${totalCells} cells fully covered) - Threshold: ${completionThreshold}%`)
      
      // Consider "complete" when threshold is reached
      if (scratchedPercentage >= completionThreshold && !this.isComplete) {
        this.isComplete = true
        this.onScratchComplete()
      }
      return scratchedPercentage
    },

    onScratchComplete() {
      console.log('Scratch card completed!')
      // Auto-reveal remaining areas
      this.revealCanvas.clearRect(0, 0, this.reveal.width, this.reveal.height)
      // Emit completion event
      this.$emit('scratchComplete')
    }
  }
}
</script>

<style>
.myCanvas {
  display: block;
  visibility: hidden;
  margin: 0 auto;
  background-size: cover;
  max-width: 100%;
  height: auto;
  cursor: url(https://landerpop.s3.us-east-1.amazonaws.com/gaming/cursor.png) 37.2 37.2;
}
.scratcher {
  display: flex;
  width: 100%;
  background-color: white;
}
</style>