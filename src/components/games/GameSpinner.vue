<template>
  <div class="game-spinner" style="color:#fff;">
    <div class="spinner"
      :style="`background-image: url('${this.imageRoot}lpuEkSePpwewsvqsCtzvqRMz/${backDrop}');`">
      <canvas :id="gameId" 
        :width="`${windowWidth* .85}`"
        :height="`${windowWidth * .85}`"
        class="mycanvas">
      </canvas>
    </div>
    <br/>
    <button @click="startSpin" :disabled="isSpinning">Make Spin</button><br/><br/>
    <div>Current Rotation: {{ currentRotation.toFixed(1) }}°</div>
    <div>Target Rotation: {{ targetRotation.toFixed(1) }}°</div>
    <div>Current Speed: {{ currentSpeed.toFixed(2) }}</div>
    <div>Normalized: {{ normalizedTarget }}</div>
    <div>Phase: {{ currentPhase }}</div>
    <div v-if="hasManualTarget" style="color: yellow;">Manual Target Active</div>
    <br/>
    <input v-model.number="manualRotation" placeholder="Manual rotation" />
    <button @click="setManualRotation">Set Rotation</button><br/>
    <input v-model.number="manualTarget" placeholder="Target angle" />
    <button @click="setTarget">Set Target</button><br/>
    <input v-model.number="manualOffset" placeholder="Wheel offset" />
    <button @click="setOffset">Set Offset</button><br/>

    <br/><br/>
  
  </div>
</template>

<script>
export default {
  name: 'WheelSpin',
  props: {
    gameId: {
      type: String,
      default: 'testa'
    },
    backDrop: {
      type: String,
      default: 'backdrop.png' + `?t=${Date.now()}`
    },
    wheelImage: {
      type: String,
      default: `ColorWheelNos.png`
    }
  },
  data () {
    return {
      // Canvas elements
      canvas: null,
      ctx: null,
      wheel: null,
      
      // Animation state
      isSpinning: false,
      animateId: null,
      
      // Rotation tracking (in degrees)
      currentRotation: 0,
      targetRotation: 0,
      wheelOffset: 0, // Offset to account for wheel image's initial position
      wheelImageOffset: 0, // Offset to account for how the wheel image is oriented
      
      // Animation physics
      currentSpeed: 0,
      maxSpeed: 15,
      acceleration: 0.8,
      deceleration: 0.96,
      minSpeed: 0.1,
      
      // Animation phases
      currentPhase: 'stopped', // 'accelerating', 'spinning', 'decelerating', 'stopped'
      
      // Spin configuration
      minSpins: 8,
      maxSpins: 12,
      totalSpinDistance: 0,
      
      // Manual target tracking
      hasManualTarget: false,
      
      // Manual controls
      manualRotation: 0,
      manualTarget: 90,
      manualOffset: 0
    }
  },


  computed: {
    normalizedTarget() {
      return (this.targetRotation % 360).toFixed(1)
    }
  },
  
  mounted () {
    this.canvas = document.getElementById(this.gameId)
    this.ctx = this.canvas.getContext('2d')
    this.wheel = new Image()
    this.wheel.onload = () => {
      // Set a random visual starting position
      this.wheelOffset = 0
      this.currentRotation = this.wheelOffset
      this.drawWheel()
    }
    this.wheel.src = `${this.imageRoot}lpuEkSePpwewsvqsCtzvqRMz/${this.wheelImage}`
  },

  methods: {
    startSpin() {
      if (this.isSpinning) return

      // Reset wheel position to 0 before spinning
      this.currentRotation = 0

      this.isSpinning = true
      this.currentPhase = 'accelerating'
      this.currentSpeed = 0

      // Only calculate new target if no manual target is set
      if (!this.hasManualTarget) {
        const spins = this.minSpins + Math.random() * (this.maxSpins - this.minSpins)
        const finalAngle = Math.random() * 360
        this.targetRotation = this.currentRotation + (spins * 360) + finalAngle
      }

      this.totalSpinDistance = this.targetRotation - this.currentRotation

      console.log(`Starting spin: ${this.currentRotation.toFixed(1)}° → ${this.targetRotation.toFixed(1)}° ${this.hasManualTarget ? '(Manual Target)' : '(Random Target)'}`)

      this.animate()
    },

    animate() {
      if (!this.isSpinning) return
      
      const remainingDistance = this.targetRotation - this.currentRotation
      const distanceTraveled = this.totalSpinDistance - remainingDistance
      const progressRatio = distanceTraveled / this.totalSpinDistance
      
      // Phase management
      if (this.currentPhase === 'accelerating' && this.currentSpeed >= this.maxSpeed) {
        this.currentPhase = 'spinning'
      } else if (this.currentPhase === 'spinning' && progressRatio > 0.7) {
        this.currentPhase = 'decelerating'
      }
      
      // Speed control
      if (this.currentPhase === 'accelerating') {
        this.currentSpeed += this.acceleration
        if (this.currentSpeed > this.maxSpeed) {
          this.currentSpeed = this.maxSpeed
        }
      } else if (this.currentPhase === 'decelerating') {
        // Smooth deceleration to target
        const targetSpeed = Math.max(remainingDistance / 60, this.minSpeed)
        this.currentSpeed = Math.max(this.currentSpeed * this.deceleration, targetSpeed)
      }
      
      // Update rotation
      this.currentRotation += this.currentSpeed
      
      // Check for completion
      if (remainingDistance <= this.currentSpeed || this.currentSpeed < this.minSpeed) {
        // Snap to target and stop
        this.currentRotation = this.targetRotation
        this.stopSpin()
        return
      }
      
      this.drawWheel()
      this.animateId = requestAnimationFrame(() => this.animate())
    },

    stopSpin() {
      this.isSpinning = false
      this.currentPhase = 'stopped'
      this.currentSpeed = 0
      this.hasManualTarget = false // Reset the flag after spin completes
      
      // Normalize rotation to 0-360 range for display
      const normalizedRotation = this.currentRotation % 360
      console.log(`Spin completed at: ${normalizedRotation.toFixed(1)}°`)
      
      if (this.animateId) {
        cancelAnimationFrame(this.animateId)
        this.animateId = null
      }
      
      this.drawWheel()
    },

    drawWheel() {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      
      // Save context
      this.ctx.save()
      
      // Move to center and rotate
      this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
      this.ctx.rotate((this.currentRotation * Math.PI) / 180)
      
      // Draw wheel centered
      this.ctx.drawImage(
        this.wheel,
        -this.canvas.width / 2,
        -this.canvas.height / 2,
        this.canvas.width,
        this.canvas.height
      )
      // Restore context
      this.ctx.restore()
    },

    setManualRotation() {
      if (this.isSpinning) return
      this.currentRotation = this.manualRotation || 0
      this.drawWheel()
    },

    setTarget() {
      if (this.isSpinning) return

      // Use integer spins to ensure exact landing position
      const spins = Math.floor(this.minSpins + Math.random() * (this.maxSpins - this.minSpins))
      this.targetRotation = (spins * 360) + (this.manualTarget || 0)
      this.hasManualTarget = true
      console.log(`Target set to land at: ${this.manualTarget}° after ${spins} spins (total: ${this.targetRotation}°)`)
    },

    setOffset() {
      this.wheelImageOffset = this.manualOffset || 0
      console.log(`Wheel offset set to: ${this.wheelImageOffset}°`)
    }
  }
}
</script>

<style>

.game-spinner {
  width: 100%;
}


.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  background-size:  contain;
}

.mycanvas {
  display: block;
  margin: 0 auto;
  width: 100%;
  padding: 2%;
}

.game-container {
  display: flex;
  justify-content: center;
  background-size: contain;
  background-position: center;
  padding: 20px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

input {
  margin: 5px;
  padding: 5px;
  width: 100px;
}
</style>