<template>
    <div class="row py-5">
        <div class="col-12">
            <h3 id="deck-definition">{{ russian ? 'Определение колоды' : 'Deck definition' }}</h3>
            <div class="row">
                <div class="col" v-if="!russian">
                    <p>
                        This is the code that defines your deck. You can copy and paste this
                        code to share or save your deck. You can also edit it live (which is
                        currently a bit buggy, so use at your own risk!)
                    </p>
                    <p>
                        You can share your deck using this
                        <a :href="deckLink">link</a>. The link is to a snapshot
                        of the current state of your deck, so if you change the deck, you'll
                        need to share a new link. Using this link will disable autosaving, so
                        whoever you share it with won't accidentally overwrite their own deck.
                    </p>
                </div>
                <div class="col" v-else>
                    <p>
                        Это код, определяющий Вашу колоду. Вы можете копировать и вставлять его,
                        чтобы поделиться или сохранить Вашу колоду. Вы также можете редактировать его в этом поле 
                        (но эта опция забагована, поэтому используйте её на свой страх и риск!)
                    </p>
                    <p>
                        Вы можете поделиться своей колодой с помощью этой
                        <a :href="deckLink">ссылки</a>. Ссылка содержит текущее состояние колоды, поэтому, если Вы измените колоду,
                        Вам потребуется поделиться новой ссылкой. Использование этой ссылки выключит автосохранение, чтобы
                        тот, кто воспользуется ей, случайно не потерял свою колоду.
                    </p>
                </div>
                <div class="col">
                    <BCard no-body>
                    <BTabs card id="firstBTabs">
                        <BTab title="JSON">
                        <BFormTextarea
                            v-model:model-value="userDeck"
                            :state="isValid"
                            @input="parseJSONDeck"
                            style="width: 100%; height: 250px; font-family: monospace;"
                        >
                        </BFormTextarea>
                        </BTab>
                    </BTabs>
                    </BCard>
                </div>
            </div>
        </div>
    </div>
    <hr />
    <div class="row py-3 justify-content-center" v-if="!russian">
        <div class="col-10">
            <h5>A Note on the Type</h5>
            <p>
                The real Unmatched cards are set in
                <a href="https://www.typography.com/fonts/knockout/overview" target="_blank">Knockout</a> by Hoefler&Co.
                Unmatched Maker uses free alternatives.
            </p>
            <p>
                The headings are set in
                <a href="https://www.fontsquirrel.com/fonts/bebas-neue" target="_blank">Bebas Neue Regular</a>
                Unfortunately, the free version of Bebas Neue doesn't have lowercase glyphs, so places
                that require them use
                <a href="https://www.theleagueofmoveabletype.com/league-gothic" target="_blank">League Gothic Regular</a>
                instead. Last but not least, the card descriptions are set in
                <!--<a href="https://www.fontsquirrel.com/fonts/archivo-narrow" target="_blank">Archivo Narrow Regular</a>
                    for legibility at small sizes.-->
                <a href="https://fonts.google.com/specimen/Roboto+Condensed" target="_blank">Roboto Condensed</a>
                for legibility at small sizes.
            </p>
        </div>
    </div>
    <div class="row py-3 justify-content-center" v-else>
        <div class="col-10">
            <h5>Замечание</h5>
            <p>
                Оригинальные карты Unmathced используют шрифт 
                <a href="https://www.typography.com/fonts/knockout/overview" target="_blank">Knockout</a> от Hoefler&Co.
                Unmatched Maker использует бесплатные альтернативы.
            </p>
            <p>
                Заголовки используют шрифт
                <a href="https://www.fontsquirrel.com/fonts/bebas-neue" target="_blank">Bebas Neue Regular</a>.
                К сожалению, его бесплатная версия не содержит строчных букв, поэтому там, где они нужны,
                используется шрифт
                <a href="https://www.theleagueofmoveabletype.com/league-gothic" target="_blank">League Gothic Regular</a>
                . Описания карт используют шрифт
                <!--<a href="https://www.fontsquirrel.com/fonts/archivo-narrow" target="_blank">Archivo Narrow Regular</a>
                    for legibility at small sizes.-->
                <a href="https://fonts.google.com/specimen/Roboto+Condensed" target="_blank">Roboto Condensed</a>
                для читабельности при маленьком размере.
            </p>
        </div>
    </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "DeckDefinition",
    emits: ['deckUpdate'],
    props: ['deck', 'deckLink', 'russian'],
    data() {
        return {
            isValid: true,
            userDeck: '',
        };
    },
    methods: {
        parseJSONDeck: function() {
            let value = this.userDeck;
            console.log(value);
            try {
                let deck = JSON.parse(value);
                this.$emit("deckUpdate", deck);
                this.isValid = true;
            } catch {
                this.isValid = false;
            }
        },
    },
    async mounted() {
        this.userDeck = JSON.stringify(this.deck, null, 2);
    },
    watch: {
        'deck': {
            handler: function(oldValue, newValue) {
                this.userDeck = JSON.stringify(newValue, null, 2);
            },
            deep: true,
        }
    }
});
</script>