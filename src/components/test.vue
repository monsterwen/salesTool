<template>
    <div>
    <div id="wrapper">
        <div id="header-wrapper">
            <BrierleyLogo></BrierleyLogo>
            <div id="" class="">
<!--                <div id="menu">-->
<!--                    <ul>-->
<!--                        <li class="current_page_item"><a href="#" accesskey="1" title="">Homepage</a></li>-->
<!--                        <li><a href="#" accesskey="2" title="">Our Clients</a></li>-->
<!--                        <li><a href="#" accesskey="3" title="">About Us</a></li>-->
<!--                        <li><a href="#" accesskey="4" title="">Careers</a></li>-->
<!--                        <li><a href="#" accesskey="5" title="">Contact Us</a></li>-->
<!--                    </ul>-->
<!--                </div>-->
            </div>
        </div>
        <div class="container">

                    <img class="" :src="require('../assets/images/TE-Title-Assessment.png')"
                    style="height:100%; width: 100%;">

        </div>
        <div id="extra" class="container">
            <div class="title">
                <span class="">The Brierley loyalty capability assessment tool serves as a guide to calibrating your current brand loyalty and capability posture across 5 key dimensions and XX separate points. The aim is to help you identify gaps and opportunities in respect of existing customer loyalty and engagement programming and provide stimulus for positive adaptation and change informed by Brierley’s suite of flexible and on-demand FAST modules.</span>

            </div>

            <div id="three-column">
                <div class="boxA card">
                    <div class="box card"> <span class="fa fa-cloud-download"></span>
                        <p>Your score on our 5 point loyalty maturity curve providing a view of your current loyalty capability ranging from Basic to Emerging to Sophisticated.</p>
                    </div>
                </div>
                <div class="boxB">
                    <div class="box"> <span class="fa fa-cogs"></span>
                        <p>A recommendation of key activities and initiatives that will advance or develop current programme effectiveness and and inform a roadmap to elevate the current maturity score.</p>
                    </div>
                </div>
                <div class="boxC">
                    <div class="box"> <span class="fa fa-user"></span>
                        <p> Access to the Brierley team who will be keen to work with you to provide the best possible loyalty solution for your business.</p>
                    </div>
                </div>
            </div>
<!--            <ul class="actions">-->
<!--                <li><a href="#" class="button">Start Assessment</a></li>-->
<!--            </ul>-->
        </div>
        <section class="table">
            <!--for demo wrap-->
            <h1>Key Dimensions</h1>
            <div class="tbl-header">
                <table cellpadding="0" cellspacing="0" border="0">
                    <thead>
                    <tr>
                        <th style="width:20%">Dimension</th>
                        <th style="width:80%">Discription</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="tbl-content">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                    <tr>
                        <td style="width:20%">Analysis</td>
                        <td style="width:80%">How well is the business set up to make sense of data and identify trends?</td>
                    </tr>
                    <tr>
                        <td style="width:20%">Insight</td>
                        <td style="width:80%">Is the business able to turn knowledge into action?</td>

                    </tr>
                    <tr>
                        <td style="width:20%">Strategy</td>
                        <td style="width:80%">Is the business effectively synthesising analytics and insight to continually evaluate and optimise the programme and communications?</td>
                    </tr>
                    <tr>
                        <td style="width:20%">Technology</td>
                        <td style="width:80%">Is programme success supported by best in class tooling ?</td>
                    </tr>
                    <tr>
                        <td style="width:20%">CX</td>
                        <td style="width:80%">Is the customer engaged and does scope exist to delight throughout the journey? </td>

                    </tr>
                    </tbody>
                </table>
            </div>
        </section>


        <!-- follow me template -->

        <div class="alert info">
            <span class="closebtn">&times;</span>
            To start the assessment process answer the questions on the "Questionnaire" by choosing the rating that applies to your company.Note that for those features that do not apply to your business, please select N/A.
        </div>
            <FASTModule></FASTModule>
<div class="container">
    <span>result</span>
</div>

    </div>
    </div>
</template>
<style>
    @import '../assets/css/default.css';
    @import '../assets/css/fonts.css';
    .banner-text{
        margin-top: 10px;
        text-align: center;
    }
    .alert {
        padding: 20px;
        background-color: #f44336;
        color: white;
        opacity: 1;
        transition: opacity 0.6s;
        margin-bottom: 15px;
    }

    .alert.success {background-color: #4CAF50;}
    .alert.info {background-color: #2196F3;}
    .alert.warning {background-color: #ff9800;}

    .closebtn {
        margin-left: 15px;
        color: white;
        font-weight: bold;
        float: right;
        font-size: 22px;
        line-height: 20px;
        cursor: pointer;
        transition: 0.3s;
    }

    .closebtn:hover {
        color: black;
    }

    h1{
        font-size: 30px;
        color: #fff;
        text-transform: uppercase;
        font-weight: 300;
        text-align: center;
        margin-bottom: 15px;
    }
    table{
        width:100%;
        table-layout: fixed;
    }
    .tbl-header{
        background-color: rgba(255,255,255,0.3);
    }
    .tbl-content{
        height:300px;
        overflow-x:auto;
        margin-top: 0px;
        border: 1px solid rgba(255,255,255,0.3);
    }
    th{
        padding: 20px 15px;
        text-align: left;
        font-weight: 500;
        font-size: 12px;
        color: #fff;
        text-transform: uppercase;
    }
    td{
        padding: 15px;
        text-align: left;
        vertical-align:middle;
        font-weight: 300;
        font-size: 12px;
        color: #fff;
        border-bottom: solid 1px rgba(255,255,255,0.1);
    }


    /* demo styles */

    @import url(https://fonts.googleapis.com/css?family=Roboto:400,500,300,700);
    .table{
        background: -webkit-linear-gradient(left, #C1D82C, #C1D82C);
        background: linear-gradient(to right, #C1D82C, #C1D82C);
        font-family: 'Roboto', sans-serif;
    }
    section{
        margin: 50px;
    }


    /* follow me template */
    .made-with-love {
        margin-top: 40px;
        padding: 10px;
        clear: left;
        text-align: center;
        font-size: 10px;
        font-family: arial;
        color: #fff;
    }
    .made-with-love i {
        font-style: normal;
        color: #F50057;
        font-size: 14px;
        position: relative;
        top: 2px;
    }
    .made-with-love a {
        color: #fff;
        text-decoration: none;
    }
    .made-with-love a:hover {
        text-decoration: underline;
    }


    /* for custom scrollbar for webkit browser*/

    ::-webkit-scrollbar {
        width: 6px;
    }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
</style>
<script>
    const close = document.getElementsByClassName("closebtn");
    let i;

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function(){
            const div = this.parentElement;
            div.style.opacity = "0";
            setTimeout(function(){ div.style.display = "none"; }, 600);
        }
    }
</script>
<script>
    import FASTModule from "../Views/FASTModule";
    import BrierleyLogo from "./BrierleyLogo";
    export default {
        components:  {FASTModule, BrierleyLogo}
    }
</script>