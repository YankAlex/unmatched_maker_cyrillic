<template>
    <template v-if="!russian">
    <div class="row py-3 justify-content-center">
        <div class="col-xl-10">
            <h1>Unmatched Maker</h1>
            <p>
                <a href="https://restorationgames.com/unmatched/" target="_blank">Unmatched</a>
                    is a board game from <a href="https://restorationgames.com/" target="_blank">Restoration Games</a>
                and <a href="https://mondotees.com/" target="_blank">Mondo Games</a> where players control various iconic
                characters in combat against each other.
                Each character has their own deck with a unique fighting style.
            </p>
            <p>
                Of course, the more heroes there are to choose from,
                the more fun the game becomes. So, in the hopes of facilitating
                a community of fan expansions, this tool allows anybody to
                create a deck in the style of the real game.
            </p>
            <div class="alert alert-primary">
                <strong>This tool is not in any way affiliated with Restoration Games
                or Mondo Games.</strong>
                The look and design of the cards is a trademark of Restoration Games, LLC
                and is used with permission. Decks using this design may not be used for commercial purposes.
            </div>
        </div>
    </div>

    <div class="row py-3 justify-content-center">
        <div class="col-xl-10">
            <h2>Editing</h2>
            <p>
                Move your mouse over the cards to see what you can edit.
                Anything editable will be highlighted when you mouse over it.
            </p>
            <p>
                Edit any text on a card by clicking on it and typing.
                For numbers, click on the "increase" and "decease"
                buttons that appear when you mouse over them.
            </p>
            <p>
                You can create multiple copies of a card by changing the quantity
                in the lower right corner. These cards remain linked;
                modifications to any one will affect all of them!
            </p>
        </div>
        <div class="col-xl-10">
            <h2>Printing</h2>
            <p>
                What you see is not quite what you get: when you print,
                everything except the cards will be hidden, and the cards
                will be next to each other to make cutting them out easier.
            </p>
            <p>
                To ensure correct printing, be sure to <strong>set your
                paper orientation to "Landscape"</strong>. You can save to a file
                using the "Save to PDF" option in your print dialogue.

            </p>
            <p>
                <em>Firefox users note</em>: you will need to select "Print Background Colours"
                and "Print Background Images" for everything to appear correctly.
                This is in the "Print" dialogue on Macs and in the "Page Settings"
                dialogue on Windows.
            </p>
        </div>
        <div class="col-xl-10">
            <h2>Saving and sharing</h2>
            <p>
                As you work your deck is automatically saved to your browser's local storage;
                if you return in the same browser on the same computer, your deck should
                still be there. If you want to make changes without autosaving, uncheck
                the "autosave" checkbox at the top of the editor.
            </p>
            <p>
                If you want to make more than one deck or share decks with friends,
                scroll to the <a href="#deck-definition">Deck definition</a> section.
                There you can copy and paste the code that defines your deck.
                You can use the handy "Human-readable UnMatched Notation" (HUmN)
                or the move universal JSON formats.
            </p>
            <p>
                You can also share you deck using this
                <a :href="deckLink">link</a>. The link is to a snapshot
                of the current state of your deck, so if you change the deck, you'll
                need to share a new link. Using this link will disable autosaving, so
                whoever you share it with won't accidentally overwrite their own deck.
            </p>
            <div class="row">
                <div class="col-12">
                    <h4>Example</h4>
                </div>
                <div class="col-7">
                    <p>
                        Try copying this example deck and pasting it
                        in the <a href="#deck-definition">Deck definition</a> area.
                        As an added bonus, the cards will illustrate some of Unmatched
                        Maker's features.
                    </p>
                </div>
                <div class="col">
                    <BCard no-body>
                    <BTabs card id="secondBTabs">
                        <BTab title="JSON">
                        <BFormTextarea
                            readonly
                            onclick="this.focus();this.select()"
                            style="width: 100%;
                            height:100px; font-family: monospace;"
                            :model-value="exampleDeckJSON"
                        ></BFormTextarea>
                        </BTab>
                    </BTabs>
                    </BCard>
                </div>
            </div>
        </div>
        <div class="col-xl-10">
            <h2>Deck design principles</h2>
            <p>Roman at <a href="http://www.geektopiagames.com/" target="_blank">Geektopia Games</a>
            has written an article describing Unmatched
            <a href="http://www.geektopiagames.com/games/unmatched/unmatched-deck-structure/" target="_blank">deck structure</a>.
            He also has other <a href="http://www.geektopiagames.com/games/unmatched/" target="_blank">Unmatched articles</a>
            that are extremely useful.
            </p>
            <p>
            The place to discuss Unmatched fan decks seems to be the
            BoardGameGeek Unmatched Vol. 1
            <a href="https://boardgamegeek.com/forum/2870415/unmatched-battle-legends-volume-one/variants" target="_blank">
                Variant forum
            </a>. Go there to share your decks or bounce your ideas around.
            </p>
        </div>
        <div class="col-xl-10">
            <h2>Bugs and feature requests</h2>
            <p>The project files for Unmatched Maker are available in the
            <a href="https://github.com/YankAlex/unmatched_maker_cyrillic/" target="_blank">GitHub repo</a>.
            Please post any bugs or feature requests on the
            <a href="https://github.com/YankAlex/unmatched_maker_cyrillic/issues" target=_blank>Issues</a>
            page there.
            </p>
        </div>
    </div>
    </template>

    <template v-else>
    <div class="row py-3 justify-content-center">
        <div class="col-xl-10">
            <h1>Unmatched Maker</h1>
            <p>
                <a href="https://restorationgames.com/unmatched/" target="_blank">Unmatched</a>
                    &#151; это настольная игра, созданная <a href="https://restorationgames.com/" target="_blank">Restoration Games</a>
                и <a href="https://mondotees.com/" target="_blank">Mondo Games</a>, в которой игроки управляют различными культовыми
                персонажами, сражаясь друг с другом.
                У каждого персонажа своя собственная колода и уникальный стиль ведения боя.
            </p>
            <p>
                Конечно, чем больше доступных персонажей,
                тем веселее становится игра. Поэтому в надежде на облегчение
                роста сообщества этот инструмент позволяет любому
                создать колоду в стиле официальной игры.
            </p>
            <div class="alert alert-primary">
                <strong>Этот инструмент никак не свзяан ни с Restoration Games,
                ни с Mondo Games.</strong>
                Внешний вид и дизайн карт &#151; торговая марка Restoration Games, LLC
                и используется с их разрешения. Колоды, использующие этот дизайн, не могут быть использованы в коммерческих целях.
            </div>
        </div>
    </div>

    <div class="row py-3 justify-content-center">
        <div class="col-xl-10">
            <h2>Редактирование</h2>
            <p>
                Двигайте мышь по картам, чтобы увидеть, что Вы можете изменить.
                Всё изменяемое будет выделяться рамкой при наведении мыши.
            </p>
            <p>
                Для редактирования текста нажмите на него и печатайте.
                Чтобы изменить числа, нажимайте кнопки &#171;увеличить&#187; и &#171;уменьшить&#187;,
                которые появляются при наведении мыши.
            </p>
            <p>
                Вы можете создать несколько копий одной карты. Для этого измените их количество
                в правом нижнем углу. Эти карты остаются связаны,
                изменение одной из них повлияет на остальные!
            </p>
        </div>
        <div class="col-xl-10">
            <h2>Печать</h2>
            <p>
                То, что Вы видите, &#151; это не совсем то, что Вы получите: при печати
                всё, кроме карт, будет скрыто, а карты будут
                расположены друг около друга для удобства вырезания.
            </p>
            <p>
                Чтобы обеспечить правильную печать, убедитесь, <strong>что
                установлена альбомная ориентация</strong>. Чтобы сохранить результат в файл,
                используйте опцию &#171;Сохранить в PDF&#187; в диалоге печати.

            </p>
            <p>
                <em>Пользователям Firefox</em>: Вам потребуется установить настройки &#171;Печатать цвета фона&#187;
                и &#171;Печатать фоновые изображения&#187;, чтобы всё отобразилось правильно.
                Они расположены в диалоге &#171;Печать&#187; на Mac и в диалоге &#171;Настройки страницы&#187;
                на Windows.
            </p>
        </div>
        <div class="col-xl-10">
            <h2>Сохранить и поделиться</h2>
            <p>
                Ваша колода автоматически сохраняется в локальном хранилище Вашего браузера.
                Если Вы вернётесь с того же браузера и компьютера, Ваша колода должна быть
                на месте. Если Вы не хотите автоматически сохранять изменения, уберите галочку
                в верхней части редактора.
            </p>
            <p>
                Если Вы хотите создать более одной колоды или поделиться своей колодой с друзьями,
                пролистайте до секции <a href="#deck-definition">Определение колоды</a>.
                Там Вы сможете скопировать или вставить код, определяющий Вашу колоду.
            </p>
            <p>
                Вы также можете поделиться этой
                <a :href="deckLink">ссылкой</a>. Ссылка содержит текущее состояние колоды, поэтому, если Вы измените колоду,
                Вам потребуется поделиться новой ссылкой. Использование этой ссылки выключит автосохранение, чтобы
                тот, кто воспользуется ей, случайно не потерял свою колоду.
            </p>
            <div class="row">
                <div class="col-12">
                    <h4>Пример</h4>
                </div>
                <div class="col-7">
                    <p>
                        Попробуйте скопировать эту колоду-пример и вставить её в
                        секции <a href="#deck-definition">Определение колоды</a>.
                        Карты продемонстрируют некоторые особенности Unmatched
                        Maker.
                    </p>
                </div>
                <div class="col">
                    <BCard no-body>
                    <BTabs card id="secondBTabs">
                        <BTab title="JSON">
                        <BFormTextarea
                            readonly
                            onclick="this.focus();this.select()"
                            style="width: 100%;
                            height:100px; font-family: monospace;"
                            :model-value="exampleDeckJSON"
                        ></BFormTextarea>
                        </BTab>
                    </BTabs>
                    </BCard>
                </div>
            </div>
        </div>
        <div class="col-xl-10">
            <h2>Принципы создания колоды</h2>
            <p>Роман на сайте <a href="http://www.geektopiagames.com/" target="_blank">Geektopia Games</a>
            написал статью о
            <a href="http://www.geektopiagames.com/games/unmatched/unmatched-deck-structure/" target="_blank">структуре колоды</a> в Unmatched.
            У него также есть другие <a href="http://www.geektopiagames.com/games/unmatched/" target="_blank">статьи об Unmatched</a>,
            которые являются очень полезными.
            </p>
            <p>
            Кажется, место для обсуждения фанатских колод &#151; это
            <a href="https://boardgamegeek.com/forum/2870415/unmatched-battle-legends-volume-one/variants" target="_blank">
                Форум вариаций
            </a> BoardGameGeek Unmatched Vol. 1. Там Вы можете поделиться своей колодой или обсудить идеи колод.
            </p>
        </div>
        <div class="col-xl-10">
            <h2>Баги и запросы функциональности</h2>
            <p>Исходные файлы проекта доступны в
            <a href="https://github.com/YankAlex/unmatched_maker_cyrillic/" target="_blank">репозитории Github</a>.
            Пожалуйста, сообщайте о багах и запросах функциональности на странице
            <a href="https://github.com/YankAlex/unmatched_maker_cyrillic/issues" target=_blank>Issues</a>.
            </p>
        </div>
    </div>
    </template>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import exampleDeck from '@/mixins/exampleDeck';

export default defineComponent({
    name: "Chatter",
    components: {},
    mixins: [exampleDeck],
    props: ['russian', 'deckLink']
});
</script>
