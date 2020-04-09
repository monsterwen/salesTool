<template>
    <div class="questionCard" :class="{ 'inactive': inactive }" :id="`questionCard${index}`">
        <div class="questionText">
            <p>{{ question }}</p>
        </div>
        <div class="questionResponse">
            <div class="responseDiv"
                 :class="{ 'selected': selected.yes, 'deselected': !selected.yes && selectionMade }"
                 id="yes"
                 v-on:click="selection('yes')">
                <p>Yes</p>
            </div>
            <div class="responseDiv"
                 id="no"
                 :class="{ 'selected': selected.no, 'deselected': !selected.no && selectionMade }"
                 v-on:click="selection('no')">
                <p>No</p>
            </div>
            <div class="responseDiv"
                 id="na"
                 :class="{ 'selected': selected.na, 'deselected': !selected.na && selectionMade }"
                 v-on:click="selection('na')">
                <p>N/A</p>
            </div>
        </div>
        <div class="inactiveOverlay"
             :class="{ 'hidden': !inactive }"
             v-on:click="inactiveClick()"></div>
    </div>
</template>

<script>
    export default {
        name: 'QuestionCard',
        props: {
            question: {
                type: String,
                required: true
            },
            inactive: {
                type: Boolean,
                default: () => false
            },
            index: {
                type: Number,
                default: () => 0
            }
        },
        data: () => ({
           selected: {
               yes: false,
               no: false,
               na: false
           },
           responses: {
               yes: null,
               no: null,
               na: null
           },
            selectionMade: false
        }),
        mounted: function () {
            this.selectResponses()
        },
        methods: {
            selectResponses: function () {
            },
            selection: function (response) {
                let selected = this.selected
                // let responses = this.responses
                Object.keys(selected).forEach(d => {
                    selected[d] = false
                })

                selected[response] = true
                this.$emit('selection', response, this.index)
                this.selectionMade = true
                console.log('clicked', response)
            },
            inactiveClick: function () {
                console.log('inactiveClick')
                this.$emit('inactiveClick')
            }
        }
    }
</script>

<style scoped>
.inactiveOverlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.hidden {
    display: none;
}
.deselected {
    opacity: 0.4;
}
.questionCard {
    width: 100%;
    height: 100%;
    border-radius: 5px 3px 5px 3px;
    color: #565656;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.25em;
    background-color: #FEFEFE;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    display: flex;
    user-select: none;
    /*flex-direction: column;*/
}
.inactive {
    opacity: 0.4;
    pointer-events: none;
}
.questionText {
    width: calc(100% - 52px);
    flex-basis: calc(100% - 52px);
    margin: 0 auto;
    padding: 0px 12px 0px 12px;
    height: 100%;
    display: table;
}
.questionResponse {
    width: 52px;
    height: 100%;
    flex-basis: 52px;
    display: flex;
    flex-direction: column;
}
.responseDiv {
    height: 33.33337%;
    width: 100%;
    flex-basis: 100%;
    font-size: 0.8em;
    display: table;
    transition: box-shadow 0.2s ease-in-out,
        background-color 0.2s ease-in-out,
        transform 0.1s,
        border-radius 0.1s,
        opacity 0.1s;
}
.responseDiv:first-child {
    border-radius: 0px 3px 0px 0px;
}
.responseDiv:last-child {
    border-radius: 0px 0px 3px 0px;
}
.responseDiv:hover {
    z-index: 999;
    transform: scale(1.05, 1.05);
    border-radius: 5px 3px 5px 3px;
}
#yes {
    background-color: rgba(142, 172, 29, 0.62);
    box-shadow: 0 0 2px 0px rgba(142, 172, 29, 0.62);
}
#no {
    background-color: rgba(216, 55, 55, 0.62);
    box-shadow: 0 0 2px 0px rgba(216, 55, 55, 0.62);
}
#na {
    background-color: rgba(207, 207, 207, 0.62);
    box-shadow: 0 0 2px 0px rgba(207, 207, 207, 0.62);
}
#yes :hover {
    background-color: rgba(142, 172, 29, 0.8);
    box-shadow: inset 0 0 2px 1px rgba(142, 172, 29, 0.8);
}
#no :hover {
    background-color: rgba(216, 55, 55, 0.8);
    box-shadow: inset 0 0 2px 1px rgba(216, 55, 55, 0.8);
}
#na :hover {
    background-color: rgba(207, 207, 207, 0.8);
    box-shadow: inset 0 0 2px 2px rgba(207, 207, 207, 0.8);
}
#yes.selected {
    background-color: rgba(142, 172, 29, 0.9);
    box-shadow: 0 0 2px 0px rgba(142, 172, 29, 0.9);
}
#no.selected {
    background-color: rgba(216, 55, 55, 0.9);
    box-shadow: 0 0 2px 0px rgba(216, 55, 55, 0.9);
}
#na.selected {
    background-color: rgba(207, 207, 207, 0.9);
    box-shadow: 0 0 2px 0px rgba(207, 207, 207, 0.9);
}

p {
     text-align:center;
     vertical-align: middle;
     display: table-cell;
     cursor: pointer;
 }
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

li {
    float: left;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 16px;
    text-decoration: none;
}

ul li input[type=radio]{
    position: absolute;
    visibility: hidden;
}
ul li label{
    display: block;
    position: relative;
    font-weight: 300;
    font-size: 1.35em;
    padding: 25px 25px 25px 80px;
    margin: 10px auto;
    height: 20px;
    z-index: 9;
    cursor: pointer;
    -webkit-transition: all 0.25s linear;
}
ul li .check{
    display: block;
    position: relative;
    border: 5px solid #AAAAAA;
    border-radius: 100%;
    height: 10px;
    width: 10px;
    top: 0px;
    left: 0px;
    z-index: 5;
    transition: border .25s linear;
    -webkit-transition: border .25s linear;
}

ul li:hover .check {
    border: 5px solid #FFFFFF;
}

ul li .check::before {
    display: block;
    position: relative;
    content: '';
    border-radius: 100%;
    height: 15px;
    width: 15px;
    top: 5px;
    left: 5px;
    margin: auto;
    transition: background 0.25s linear;
    -webkit-transition: background 0.25s linear;
}

input[type=radio]:checked ~ .check {
    border: 5px solid #0DFF92;
}

input[type=radio]:checked ~ .check::before{
    background: #0DFF92;
}

input[type=radio]:checked ~ label{
    color: #0DFF92;
}


</style>