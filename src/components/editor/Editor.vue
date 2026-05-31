<template>
    <div class="no-print container">
        <div class="row py-3">
            <div class="col-12">
                <h2>Editor</h2>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="autoSave" id="autosave">
                    <label class="form-check-label" for="autosave">
                    Automatically save changes
                    </label>
                </div>
            </div>
            <div class="col deck-properties">
                <h3>Appearance</h3>
                <div class="form-group">
                    <label for="zoomControl">Zoom</label>
                    <input type="range" class="form-control-range" id="zoomControl" min="1" max="2" step="any" v-model.number="zoom">
                    <small class="text-muted">Does not affect print size</small>
                </div>
                <div class="form-group">
                    Card font size: <input v-model="cardTextSize" style="width: 3em" /> mm
                </div>
                <div class="card-deck appearance">
                    <div class="card"
                        :class="[deck.appearance.isPNP ? 'text-muted' : 'border-primary']"
                        @click="deck.appearance.isPNP = false"
                    >
                        <h5 class="card-header">
                            Production
                        </h5>
                        <div class="card-body">
                            <p class="card-text">
                                As close as possible to the real thing without having
                                <a href="https://oliverbarrett.com/" target="_blank">Oliver Barrett</a> do the art for you.
                            </p>
                            <div class="form-group">
                                <label>
                                    Highlight colour
                                </label>
                                <input
                                    v-model="deck.appearance.highlightColour"
                                    :disabled="deck.appearance.isPNP"
                                    class="form-control"
                                    type="color"
                                >
                            </div>
                            <div class="form-group">
                                <label>
                                Background pattern
                                </label>
                                <SvgBackgroundPicker
                                :selectedPattern="deck.appearance.patternName"
                                :bgColour="deck.appearance.highlightColour"
                                @change:background="pattern=$event.backgroundImage"
                                @change:pattern="deck.appearance.patternName = $event"
                                ></SvgBackgroundPicker>
                                <small class="text-muted">
                                    Patterns by <a href="https://www.heropatterns.com/" target="_blank">Steve Schoger</a>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="card"
                        :class="[deck.appearance.isPNP ? 'border-primary': 'text-muted']"
                        @click="deck.appearance.isPNP = true"
                    >
                        <h5 class="card-header">
                            Print and play
                        </h5>
                        <div class="card-body">
                            <p class="card-text">
                                Something a little simpler, but still great looking,
                                for saving ink when printing DIY cards.
                            </p>
                            <p>
                                <label>
                                    Border colour
                                </label>
                                <input
                                    v-model="deck.appearance.borderColour"
                                    :disabled="!deck.appearance.isPNP"
                                    class="form-control"
                                    type="color"
                                >
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-auto">
                <h3>Character</h3>
                <ZoomBox :zoomFactor="zoom">
                    <UnmatchedCharacterCard
                        :isEditable="true"
                        v-model:heroName="deck.hero.name"
                        v-model:heroIsRanged="deck.hero.isRanged"
                        v-model:heroHp="deck.hero.hp"
                        v-model:heroMove="deck.hero.move"
                        v-model:heroSpecialAbility="deck.hero.specialAbility"
                        v-model:sidekickName="deck.sidekick.name"
                        v-model:sidekickIsRanged="deck.sidekick.isRanged"
                        v-model:sidekickHp="deck.sidekick.hp"
                        v-model:sidekickQuantity="deck.sidekick.quantity"
                        v-model:sidekickQuote="deck.sidekick.quote"
                        :russian
                    />
                </ZoomBox>
            </div>
        </div>
        <div class="row">
            <div class="col">
            <h3>Rules cards</h3>
            </div>
        </div>
        <div class="row">
            <div v-for="(ruleCard, id) in deck.ruleCards" class="col-auto py-3" :key="id">
            <ZoomBox :zoomFactor="zoom">
            <UnmatchedRulesCard
                :isEditable="true"
                v-model:ruleName="ruleCard.title"
                v-model:ruleText="ruleCard.content"
                @delete:rule="deck.ruleCards.splice(id, 1)"
            />
            </ZoomBox>
            </div>
            <div class="col-auto py-3">
            <ZoomBox :zoomFactor="zoom">
                <div class="unmatched-card blank" @click="addRulesCard" style="cursor: pointer;">
                <i class="fas fa-plus-circle"></i>
                </div>
            </ZoomBox>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h3>Deck</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-auto py-3" v-for="(card, index) in fullDeck" :key="card.id">
                <ZoomBox :zoomFactor="zoom">
                    <UnmatchedCard
                        :isEditable="true"
                        :deckProperties="deck"
                        v-model:cardType="card.data.type"
                        v-model:cardValue="card.data.value"
                        v-model:cardTitle="card.data.title"
                        v-model:characterName="card.data.characterName"
                        v-model:boostValue="card.data.boost"
                        v-model:basicText="card.data.basicText"
                        v-model:immediateText="card.data.immediateText"
                        v-model:duringText="card.data.duringText"
                        v-model:afterText="card.data.afterText"
                        v-model:imageUrl="card.data.imageUrl"
                        v-model:cardQuantity="card.data.quantity"
                        class="float-left shadow"
                        :class="{'border-danger': index >= 30}"
                        @delete:card="deck.cards.splice(card.origIndex, 1)"
                        :russian
                        :textSize="cardTextSize + 'mm'"
                        :capitalTextSize="Number(cardTextSize) * 1.2 + 'mm'"
                    />
                </ZoomBox>
            </div>
            <div class="col-auto py-3" v-for="(_, index) in remainingCards" :key="index">
                <ZoomBox :zoomFactor="zoom">
                    <div v-if="index === 0" class="unmatched-card blank" @click="add" style="cursor: pointer;">
                        <i class="fas fa-plus-circle"></i>
                    </div>
                    <div v-else class="unmatched-card blank">
                        {{index + fullDeck.length + 1}}
                    </div>
                </ZoomBox>
            </div>
        </div>

        <ChartView :deck :fullDeck />

        <DeckDefinition @deckUpdate="(v) => {deck = v;}" :deck :deckLink />
    </div>

    <Print :deck :fullDeck :russian :textSize="cardTextSize + 'mm'" :capitalTextSize="Number(cardTextSize) * 1.2 + 'mm'" />
</template>

<script lang="js">
import { defineComponent } from 'vue';
import Print from './Print.vue';
import serializeToHuman from '@/parser/serializer.js'
import UnmatchedRulesCard from '@/components/UnmatchedRulesCard.vue';
import UnmatchedCharacterCard from '@/components/UnmatchedCharacterCard.vue';
import UnmatchedCard from '@/components/UnmatchedCard.vue';
import ChartView from './ChartView.vue';
import DeckDefinition from './DeckDefinition.vue';

export default defineComponent({
    name: "Editor",
    props: ['russian'],
    emits: ['deckUpdate', 'linkUpdate'],
    components: {ChartView, Print, UnmatchedRulesCard, UnmatchedCharacterCard, UnmatchedCard, DeckDefinition},
    data() {
        return {
            deck: {
                name: "",
                appearance: {
                    isPNP: false,
                    borderColour: "#E0EFF0",
                    highlightColour: "#F07838",
                    patternName: '',
                },
                ruleCards: [
                ],
                hero: {
                    name: "Hero",
                    isRanged: false,
                    hp: 15,
                    move: 2,
                    specialAbility: "This is the character's special ability."
                },
                sidekick: {
                    name: "Sidekick",
                    isRanged: true,
                    hp: 6,
                    quantity: 1,
                    quote: "I work best alone"
                },
                cards: [],
            },
            userDeck: '',
            humanReadableDeck: '',
            autoSave: true,
            zoom: 1,
            cardTextSize: "3.3",
        };
    },
    computed: {
        fullDeck: function() {
            var fullDeck = [];
            this.deck.cards.forEach((card, outerIndex) => {
                var quantity = parseInt(card.quantity) || 1;
                quantity = quantity > 0 ? quantity : 1;
                [...Array(quantity)].forEach((_, innerIndex) => {
                    fullDeck.push({
                        data: card,
                        id: `${outerIndex}_${innerIndex}`,
                        origIndex: outerIndex,
                    });
                });
            });
            return fullDeck
        },
        fullRuleCards: function() {
            var ruleCards = [];
            this.deck.ruleCards.forEach((card, outerIndex) => {
                  ruleCards.push({
                      data: card,
                      id: `${outerIndex}`,
                  });
            });
            return ruleCards
        },
        remainingCards: function() {
            const remainingCardCount = this.fullDeck.length < 30 ? 30 - this.fullDeck.length : 0;
            return [...Array(remainingCardCount)]
        },
        deckLink: function() {
            return '/?deck=' + encodeURIComponent(this.humanReadableDeck);
        },
    },
    async mounted() {
        this.$nextTick(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const urlDeck = urlParams.get('deck');
            if (urlDeck) {
                this.autoSave = false;
                const humanDeck = decodeURIComponent(urlDeck);
                // this.parseHumanDeck(humanDeck);
                return
            } else if (localStorage.getItem('unmatched-deck')) {
                const deck = JSON.parse(localStorage.getItem('unmatched-deck'));
                this.deck.name = deck.name
                this.deck.appearance = deck.appearance
                this.deck.hero = deck.hero
                this.deck.sidekick = deck.sidekick
                this.deck.ruleCards = deck.ruleCards
                deck.cards.forEach((card, index) => {
                    this.deck.cards[index] = card;
                })
            }
            this.$emit("deckUpdate", this.deck)
        })
    },
    methods: {
        add: function() {
            this.deck.cards.push(
                {
                    title: "Card title",
                    type: "versatile",
                    characterName: "Any",
                    value: 2,
                    boost: 1,
                    basicText: "",
                    immediateText: "",
                    duringText: "",
                    afterText: "",
                    imageUrl: '',
                    quantity: 1,
                })
        },
        addRulesCard: function() {
            this.deck.ruleCards.push(
                {
                    title: "Extra rule",
                    content: "This is extra rules card",
                })
        },
        localStorageSave: function() {
            localStorage.setItem('unmatched-deck', JSON.stringify(this.deck));
        },
        serializeToHuman
    },
    watch: {
        'deck': {
            handler: function() {
                this.humanReadableDeck = serializeToHuman(this.deck);
                if (this.autoSave) {
                    this.localStorageSave();
                }
                this.$emit("deckUpdate", this.deck)
            },
            deep: true
        },
        'deckLink': {
            handler: function() {
                this.$emit("linkUpdate", this.deckLink)
            }
        }
    }
});
</script>

<style lang="less">
    @font-face {
        font-family: BebasNeueRegular;
        /*src: url("~@/assets/fonts/BebasNeueRegular-vm3oZ.otf");*/
        src: url("/assets/fonts/bebasneuecyrillic.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: League Gothic;
        src: url("/assets/fonts/LeagueGothic-Regular.otf");
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: Archivo Narrow;
        src: url("/assets/fonts/RobotoCondensed-Regular.ttf");
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: Archivo Narrow;
        src: url("/assets/fonts/RobotoCondensed-Bold.ttf");
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-family: Archivo Narrow;
        src: url("/assets/fonts/RobotoCondensed-Italic.ttf");
        font-weight: normal;
        font-style: italic;
    }

    @font-face {
        font-family: Archivo Narrow;
        src: url("/assets/fonts/RobotoCondensed-BoldItalic.ttf");
        font-weight: bold;
        font-style: italic;
    }

    * {
        box-sizing: border-box;
    }

    @page {
        size: landscape;
    }
    
    /* 
    body {
        background-color: #111;
        color: #eee;
    }*/


    .printnplay {
        .unmatched-card {
            border-radius: 0;
            background: var(--inner-border-colour);
        }
    }

    .print {
        position: absolute;
        opacity: 0;
        top: 0;
        left: 0;
        z-index: -9999;
    }

    @media print {
        * {
            -webkit-transition: none !important;
            transition: none !important;
        }

        body {
          background-color: white;
        }

        .no-print {
            display: none !important;
        }

        .print {
            opacity: 1;
            display: block !important;

            .unmatched-card {
                float: left;
                margin: 0;
                page-break-inside: avoid;
            }
        }
    }

    .unmatched-card {
        line-height: normal;
        // float: left;
        // margin: 50px;
    }

    .unmatched-card {
        width: 63mm;
        height: 88mm;
        background: var(--outer-border-colour);
        padding: 3mm;
        // border: 1px solid rgba(0,0,0,.125);

        border-radius: 2.5mm;
        &.blank {
            background: #333;
            color: #111;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            user-select: none;

            font-size: 32mm;
        }
    }

    .unmatched-card, .unmatched-card * {
        font-weight: normal;
        font-family: BebasNeueRegular, sans-serif;
        color-adjust: exact;
    }

    .appearance .card {
        cursor: pointer;
    }

    .border-danger {
        border-width: 1mm;
    }

    .deck-properties {
      min-width: 600px;
    }
</style>

