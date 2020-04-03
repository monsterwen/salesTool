<template>
    <div class="questionCard">
        <div class="questionText">
            <p>{{ question }}</p>
        </div>
        <div class="questionResponse">
<!--            <ul>-->
<!--                <li>-->
<!--                    <input type="radio" id="f-option" name="selector">-->
<!--                    <label for="f-option">Yes</label>-->

<!--                    <div class="check"></div>-->
<!--                </li>-->

<!--                <li>-->
<!--                    <input type="radio" id="s-option" name="selector">-->
<!--                    <label for="s-option">No</label>-->

<!--                    <div class="check"><div class="inside"></div></div>-->
<!--                </li>-->

<!--                <li>-->
<!--                    <input type="radio" id="t-option" name="selector">-->
<!--                    <label for="t-option">N/A</label>-->

<!--                    <div class="check"><div class="inside"></div></div>-->
<!--                </li>-->
<!--            </ul>-->
            <div class="responseDiv"
                 id="yes"
                 v-on:click="selection('yes')">
                <p>Yes</p>
            </div>
            <div class="responseDiv"
                 id="no"
                 v-on:click="selection('no')">
                <p>No</p>
            </div>
            <div class="responseDiv"
                 id="na"
                 v-on:click="selection('na')">
                <p>N/A</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'QuestionCard',
        props: {
            question: {
                type: String,
                required: true
            }
        },
        methods: {
            selection: function (response) {
                console.log('clicked', response)
            }
        }
    }
</script>

<style scoped>
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
    /*flex-direction: column;*/
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
    transition: box-shadow 5s ease-in-out,
        background-color 5s ease-in-out,
        transform 0.1s,
        border-radius 0.1s;
}
.responseDiv:first-child {
    border-radius: 0px 3px 0px 0px;
}
.responseDiv:last-child {
    border-radius: 0px 0px 3px 0px;
}
.responseDiv:hover {
    z-index: 999;
    transform: scale(1.1, 1.1);
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