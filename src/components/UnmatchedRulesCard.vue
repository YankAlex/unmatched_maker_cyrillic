<template>
    <div class="unmatched-card" :class="[isEditable ? 'editable':'']">
        <div class="main-wrapper">
            <div v-if="isEditable" class="delete-button um-invisible">
                <span @click="$emit('delete:rule', $event)" class="fa-layers fa-fw fa-2x">
                    <i class="fas fa-circle"></i>
                    <i class="fa-inverse fas fa-times" data-fa-transform="shrink-6"></i>
                </span>
            </div>
            <div class="rule panel">
                <div class="name section">
                    <div class="content xl" @click="focusEditableText">
                        <span
                            v-text="ruleName" class="scale-text"
                            :contenteditable="isEditable"
                            @input="scaleText($event.target)"
                            @blur="updateEditableText('ruleName', $event)"
                            @keypress.13="$event.preventDefault(); $event.target.blur()"
                        ></span>
                    </div>
                </div>
            </div>

            <div class="rule-text panel">
                <div class="special section">
                    <div class="content">
                        <span
                            v-text="ruleText"
                            :contenteditable="isEditable"
                            style="white-space: pre-wrap;"
                            class="mixed-case"
                            @blur="updateEditableText('ruleText', $event)"
                        ></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import editable from '@/mixins/editable.js'

export default {
    name: 'UnmatchedRulesCard',
    mixins: [editable],
    props: {
        isEditable: {
            type: Boolean,
            default: false
        },
        ruleName: {
            type: String,
        },
        ruleText: {
            type: String,
        },
    },
    data: function () {
        return {
            initialWidth: undefined,
        }
    },
    computed: {
    },
    mounted: function() {
        this.$nextTick(function () {
            const ruleNameText = this.$el.querySelector('.rule .name .xl.content');
            const computedStyle = window.getComputedStyle(ruleNameText);
            const paddingLeft = parseFloat(computedStyle.paddingLeft.replace('px',''));
            const paddingRight = parseFloat(computedStyle.paddingRight.replace('px',''));
            const width = parseFloat(computedStyle.width.replace('px',''));

            this.initialWidth = width - paddingLeft - paddingRight;

            this.$nextTick(() =>{
                setTimeout(() => {
                    this.scaleText('.rule .name .xl.content span');
                }, 200);
            });
        });
    },
    watch: {
        'ruleName': function() {
            this.$nextTick(() => {
                this.scaleText('.hero .name .xl.content span');
            });
        }
    },
    methods: {
        scaleText: function(selector) {
            const ruleNameText = (selector instanceof HTMLElement) ?
                selector : this.$el.querySelector(selector);
            // const computedStyle = window.getComputedStyle(heroNameText);
            const width = ruleNameText.offsetWidth;

            // Need to check width because for some reason
            // this gets fired twice, once with the width=0,
            // which would reset the scale to (1) every time
            if (width){
                ruleNameText.style['transform'] = 'scaleX(1)';
                if (width > this.initialWidth) {
                    ruleNameText.style['transform'] =`scaleX(${this.initialWidth/width})`;
                    ruleNameText.style['transform-origin'] = 'left bottom';
                }
            }
        },
        circleOffset: function(index) {
            const circleSize = 5.5;
            var offset;

            if (this.sidekickQuantity === 2){
                offset = index ? -circleSize/6 : -5*circleSize/6;
            } else {
                const farLeftOffset = -5.5;
                const farRightOffset = 5.5 - circleSize;
                const diff = farRightOffset - farLeftOffset;
                offset = farLeftOffset + index/(this.sidekickQuantity - 1) * diff;
            }

            return offset + "mm"
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

@corner: 1.5mm;
@thick-border-width: 1mm;
@thin-border-width: 0.4mm;
@thinner-border-width: 0.2mm;
@editable-glow: 2px 2px rgba(0, 192, 255, 0.5),
                        2px -2px rgba(0, 192, 255, 0.5),
                        -2px 2px rgba(0, 192, 255, 0.5),
                        -2px -2px rgba(0, 192, 255, 0.5);

@media print {
  * {
    -webkit-transition: none !important;
    transition: none !important;
    zoom: 1 !important;
  }
}

.editable {
    

    &:hover {
        // .editor {
        //     visibility: visible;
        //     opacity: 0.5;
        // }
        
       .um-invisible {
            opacity: 1;
        }
    }
   
    .delete-button {
        color: #CCC;
        cursor: pointer;
        position: absolute;
        right: -6mm;
        top: -6mm;
        z-index: 100;
        &:hover{
            color: red;
        }
    }
    
    .um-invisible:hover {
        opacity: 1;
    }

    .content {
        cursor: text;

        &:hover {
            box-shadow: @editable-glow;
        }
    }
}

.um-invisible {
    opacity: 0;
}

.inner-border {
    background: var(--inner-border-colour);
    border-color: var(--inner-border-colour);
}

.main-wrapper {
    position: relative;
    // overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: @corner;
}

.panel {
    position: relative;
    height: 13.5mm;
    background: #000;
    color: #FFF;

    &.rule {
        border-radius: @corner @corner 0 0;
    }

    &.rule-text {
        height: 100%;/*40.4mm + 2*@thick-border-width;*/
        border-top: @thick-border-width solid var(--inner-border-colour);

        border-radius: 0 0 @corner @corner;
        background: var(--highlight-colour);
        background-image: var(--background-pattern);
        color: var(--contrast-colour);

        .section {
            height: 100%;
            padding-top: 4.7mm;
            padding-bottom: 4.7mm;
        }

        .mixed-case {
            font-family: League Gothic, sans-serif;
        }

    }

    .xl {
        font-size: 9mm;
        line-height: 9mm;
        white-space: nowrap;
    }

    .content {
        height: 100%;
        margin-left: 3.9mm;
        margin-right: 3.9mm;

        .scale-text {
            display: inline-block;
        }
    }
}

.section {
    &.name {
        height: 11.5mm; // Has this included the border?
        border-bottom: @thin-border-width solid var(--inner-border-colour);

        padding-top: 1.9mm;
    }
}

.special {
    height: 100%;
    width: 100%;
    float:left;

    .content span {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
}

.printnplay {
    .panel, .panel.abilities {
        background: #FFF;

        color: #000;
    }
}

</style>
