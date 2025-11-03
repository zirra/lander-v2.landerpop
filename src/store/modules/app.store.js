//import Storage from '@/com/system/storage'

const MUTATE_APPLICATION = 'mutateApplication'
const MUTATE_PROPERTY_ID = 'mutatePropertyId'
const MUTATE_ISMAIN = 'mutateIsMain'
const MUTATE_SEGMENT = 'mutateSegment'

const state = {
  segment: null,
  application: {
    "propertyId": "lpuEkSePpwewsvqsCtzvqRMz",
    "applicationId": "default",
    "branding": {
      "appName": "Prairie Band Casino and Resort",
      "primary": "rgb(255, 255, 255)",
      "secondary": "rgb(81, 47, 235)",
      "highlight": "rgb(81, 47, 235)",
      "heading": "rgb(255,255,255)",
      "content": "rgb(255,255,255)",
      "background": {
        "color": "#000",
        "font": "#fff",
        "image": null
      },
      "logo": {
        "url": "PrairieBandLogo.png",
        "alt": "Prairie Band Casino and Resort",
      },
    },
    "includes": [
      {
        "scriptId": "chalkline",
        "scriptUrl":
          "https://demo.chalklinegames.com/integration/embed.js?ts=s",
      },
    ],
    "content": [
      {
        "segmentId": "cat1",
        "segmentName": "Prairie Band Sportsbook",
        "routeName": "sportsenthusiast",
        "image": "main_sportsbook.png",
        "segments": [
          {
            "contentId": "content",
            "title": "Prairie Band Sportsbook",
            "content": "<p>Prairie Band Sportsbook Looking for the ultimate sports betting experience? Place your wager with a friendly member of our team in the brand-new sportsbook, filled with wall-to-wall TVs, food, drink and unlimited action! Or, lock in your winning parlay at one of our 10 state-of-the-art sports betting kiosks. From football to basketball, to any sport in between, you can always Bet Your Way with Prairie Band Sportsbook!</p>",
            "link": {
              "url": "https://www.prairieband.com/sportsbook/",
              "button": "Sports Betting"
            }
          },
          {
            "contentId": "contest",
            "title": "Freeplay Rewards"
          },
          {
            "contentId": "commerce",
            "title": "Commerce Callout"
          }
        ]
      },
      {
        "segmentId": "cat2",
        "segmentName": "Prairie Band Slots",
        "routeName": "slotplayer",
        "image": "main_slotsplayer.png",
        "segments": [
          {
            "contentId": "content",
            "title": "Prairie Band Slots",
            "content": "<p>Take our slots for a spin and find your new favorite game! Choose from our 1,200 slot machines including a wide variety of slots and video poker, including games that are exclusive in Kansas, the Midwest and sometimes across the entire country!</p><br/><p>Classic slot machines like 3 Reel $1 Double Gold or .01¢ Stinkin’ Rich and other slots you’ve loved throughout the years. Brand new slots are added to the floor regularly adding excitement, fun bonuses, interactive features and growing progressive jackpots!<h3>High Limit Slots</h3><p>Whether you’re looking for a little privacy or wanting to bet big, you will enjoy the selection in our High Limit Room. Game variety includes .05¢-.25¢ video including Huff N Puff, and Dragon Link, $1-$10 reels including Blazing 777 Triple Double Jackpot Wild and Double Gold, and $1-$5 video poker including Triple Play, Five Play, and Five Star Poker.</p>",
            "link": {
              "url": "https://www.prairieband.com/slot/slots/",
              "button": "View Slots"
            }
          },
          {
            "contentId": "contest",
            "title": "Win Freeplay Credits"
          },
          {
            "contentId": "commerce",
            "title": "Commerce Callout"
          }
        ]
      },
      {
        "segmentId": "cat3",
        "segmentName": "Upcoming Events",
        "routeName": "upcomingevents",
        "image": "main_events.png",
        "segments": [
          {
            "contentId": "content",
            "title": "",
            "content": "",
            "link": {
              "url": "https://www.prairieband.com/shows/",
              "button": "Upcoming Shows"
            }
          },
          {
            "contentId": "contest",
            "title": "Play to Win Tickets"
          },
          {
            "contentId": "commerce",
            "title": "Commerce Callout"
          }
        ]
      },
      {
        "segmentId": "cat4",
        "segmentName": "Prairie Band Table Games",
        "routeName": "tablegames",
        "image": "main_tablegames.png",
        "segments": [
          {
            "contentId": "content",
            "title": "",
            "content": "",
            "link": {
              "url": "https://www.prairieband.com/table-game/blackjack/",
              "button": "Our Table Games"
            }
          },
          {
            "contentId": "contest",
            "title": "Win Table Credits"
          },
          {
            "contentId": "commerce",
            "title": "Commerce Callout"
          }
        ]
      },
      {
        "segmentId": "cat5",
        "segmentName": "Prairie Band Bingo Sessions",
        "routeName": "bingoplayers",
        "image": "main_bingoplayer.png",
        "segments": [
          {
            "contentId": "content",
            "title": "",
            "content": "",
            "link": {
              "url": "https://www.prairieband.com/bingo/",
              "button": "Bingo Options"
            }
          },
          {
            "contentId": "contest",
            "title": "Bingo Credits"
          },
          {
            "contentId": "commerce",
            "title": "Commerce Callout"
          }
        ]
      },
      {
        "segmentId": "cat6",
        "segmentName": "Firekeeper Golf Course",
        "routeName": "golfing",
        "image": "main_golf.png",
        "segments": [
          {
            "contentId": "content",
            "title": "",
            "content": "",
            "link": {
              "url": "https://firekeepergolf.com/",
              "button": "Schedule"
            }
          },
          {
            "contentId": "contest"
          },
          {
            "contentId": "commerce",
            "title": "Commerce Callout"
          }
        ]
      }
    ]
  },
  isMain: false,
  propertyId: null
}

const getters = {
  application: state => state.application,
  isMain: state => state.isMain,
  propertyId: state => state.propertyId,
  segment: state => state.segment
}

const mutations = {
  mutateApplication (state, _app) {
    state.application = _app
  },
  mutateIsMain (state, _bool) {
    state.isMain = _bool
  },
  mutatePropertyId (state, _pid) {
    state.propertyId = _pid
  },
  mutateSegment (state, _segment) {
    state.segment = _segment
  }
}

const actions = {
  setApplication ({ commit }, _app) {
    commit(MUTATE_APPLICATION, _app)
  },
  setIsMain ({ commit }, _bool) {
    commit(MUTATE_ISMAIN, _bool)
  },
  setPropertyId ({ commit }, _pid) {
    commit(MUTATE_PROPERTY_ID, _pid)
  },
  setSegment ({ commit }, _segment) {
    commit(MUTATE_SEGMENT, _segment)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}