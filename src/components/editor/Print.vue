<template>
    <div class="print">
        <UnmatchedCharacterCard
            :heroName="deck.hero.name"
            :heroIsRanged="deck.hero.isRanged"
            :heroHp="deck.hero.hp"
            :heroMove="deck.hero.move"
            :heroSpecialAbility="deck.hero.specialAbility"
            :sidekickName="deck.sidekick.name"
            :sidekickIsRanged="deck.sidekick.isRanged"
            :sidekickHp="deck.sidekick.hp"
            :sidekickQuantity="deck.sidekick.quantity"
            :sidekickQuote="deck.sidekick.quote"
            :isEditable="false"
            class="float-left"
            :russian
        />
        <UnmatchedRulesCard v-for="(ruleCard, id) in deck.ruleCards" class="col-auto" :key="id"
                v-model:ruleName="ruleCard.title"
                v-model:ruleText="ruleCard.content"
                :isEditable="false"
        />
        <UnmatchedCard v-for="card in fullDeck"
            :deckProperties="deck"
            :cardType="card.data.type"
            :cardValue="card.data.value"
            :cardTitle="card.data.title"
            :characterName="card.data.characterName"
            :boostValue="card.data.boost"
            :basicText="card.data.basicText"
            :immediateText="card.data.immediateText"
            :duringText="card.data.duringText"
            :afterText="card.data.afterText"
            :imageUrl="card.data.imageUrl"
            :cardQuantity="card.data.quantity"
            :key="card.id"
            :isEditable="false"
            class="float-left"
            :russian
            :textSize
            :capitalTextSize
        />
    </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Print",
    props: ['russian', 'deck', 'fullDeck', 'textSize', 'capitalTextSize']
})
</script>