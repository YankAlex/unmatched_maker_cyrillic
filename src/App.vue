<template>
  <BApp>
    <div id="app" :style="userColours" :class="[deck?.appearance?.isPNP ? 'printnplay' : '']">
        <div class="no-print container">
            <button v-if="russian" @click="russian = false;" >To English</button>
            <button v-else @click="russian = true;">На русском</button>
            <Chatter :russian :deckLink />
        </div>
        <Editor :russian @deckUpdate="(v) => {deck = v;}" @linkUpdate="(v) => {deckLink = v;}" />
    </div>
  </BApp>
</template>

<script setup>
import {BApp} from 'bootstrap-vue-next'
</script>

<script>
import UnmatchedCard from '@/components/UnmatchedCard.vue'
import UnmatchedCharacterCard from '@/components/UnmatchedCharacterCard.vue'
import UnmatchedRulesCard from '@/components/UnmatchedRulesCard.vue'
import ZoomBox from '@/components/ZoomBox.vue'
import SvgBackgroundPicker from '@/components/SvgBackgroundPicker.vue'

import exampleDeck from '@/mixins/exampleDeck.js'

import grammar from '@/parser/unmatchedParser.js'

import UnmatchedCardIcon from './components/UnmatchedCardIcon.vue'
import Chatter from './components/Chatter.vue'
import Editor from './components/editor/Editor.vue'

export default {
    name: 'app',
    components: {
        UnmatchedCard,
        UnmatchedCharacterCard,
        UnmatchedRulesCard,
        ZoomBox,
        SvgBackgroundPicker,
        UnmatchedCardIcon,
        Chatter,
        Editor,
    },
    mixins: [exampleDeck],
    data: function () {
        return {
            deck: undefined,
            isValid: true,
            isPrint: false,
            pattern: 'none',
            isJSON: 0,
            russian: false,
            deckLink: "",
        }
    },
    computed: {
        userColours: function() {
            if (!this.deck) return undefined;
            return {
                '--inner-border-colour': this.deck.appearance.isPNP ? this.deck.appearance.borderColour : "#F7EADB",
                '--outer-border-colour': '#F7EADB',
                '--highlight-colour': this.deck.appearance.highlightColour,
                '--contrast-colour': this.isDarkText(this.deck.appearance.highlightColour),
                '--background-pattern': this.pattern,
            }
        },
    },
    watch: {
        'russian': {
            handler: function() {
                localStorage.setItem('russian', this.russian);
            }
        }
    },
    mounted: function() {
        this.$nextTick(() => {
            if (localStorage.getItem('russian')) {
                this.russian = localStorage.getItem("russian") === "true";
            }
        });
    },
    methods: {
/*        parseHumanDeck: function(value) {
            const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
            this.humanReadableDeck = value;
            try {
              parser.feed(this.humanReadableDeck);
              const parsedDeck = parser.results[0]
              try {
                const appearance = JSON.parse(parsedDeck.metadata);
                if (appearance) {
                  Object.assign(this.deck, appearance);
                }
              } catch (err) {
                this.isValid = false;
                return
              }
              if (parsedDeck.hero){
                Object.assign(this.deck.hero, parsedDeck.hero);
              }
              if (parsedDeck.sidekick) {
                Object.assign(this.deck.sidekick, parsedDeck.sidekick);
              }
              if (parsedDeck.cards) {
                this.deck.cards = [];
                parsedDeck.cards.forEach((card, index) => {
                    this.$set(this.deck.cards, index, card);
                })
              }
              this.isValid = true;
            } catch (err) {
              this.isValid = false;
            }
        },*/
        hexToRgb: function(hex) {
          // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
          var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
          hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
          });

          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          } : null;
        },
        isDarkText: function(hex) {
            const colour = this.hexToRgb(hex);
            const C = [colour.r/255, colour.g/255, colour.b/255].map(component => {
                if ( component <= 0.03928 ) {
                    return component/12.92
                } else {
                    return Math.pow((component+0.055)/1.055, 2.4);
                }
            });
            const L = 0.2126*C[0] + 0.7152*C[1] + 0.0722*C[2];
            return (L > 0.179) ? 'black' : 'white'
        },
    }
}
</script>

<!--<style land="scss"> 
    $body-bg: #000;
    $body-color: #111;
</style>-->
