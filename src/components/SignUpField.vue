<template>
    <div class="sign-up-container">
        <div class="sign-up-header">
            <div class="sign-up-title">
                <p>
                   {{ enterYourInfo }}
                </p>
            </div>
            <div class="sign-up-subhead">
                <p>
                    {{ enterYourInfoSub }}
                </p>
            </div>
        </div>
        <form
            class="sign-up-form"
            @submit="checkForm"
            action="javascript:void(0);"
            method="post">
            <div class="input-div">
                <div class="input-field">
                    <label for="fname">{{ nameField }}</label>
                </div>
                <div class="input-field">
                    <input class="input-text-field"
                           type="text"
                           id="fnameinput"
                           name="fname"
                           v-model="name"
                           value=""><br>
                </div>
                <div class="input-field">
                    <div class="input-error" :class="{ 'show-error': !this.name && this.submitted}">
                        <p>Please input a name</p>
                    </div>
                </div>
            </div>
            <div class="input-div">
                <div class="input-field">
                    <label for="email">{{ emailField }}</label>
                </div>
                <div class="input-field">
                    <input class="input-text-field"
                           type="text"
                           id="emailinput"
                           name="email"
                           v-model="email"
                           value=""><br>
                </div>
                <div class="input-field">
                    <div class="input-error" :class="{ 'show-error': !this.email && this.submitted}">
                        <p>Please input an email</p>
                    </div>
                    <div class="input-error" :class="{ 'show-error': this.email && this.submitted && !this.validEmail}">
                        <p>Please input a valid email</p>
                    </div>
                </div>
            </div>
            <div class="input-div">
                <div class="input-field">
                    <label for="phone">{{ phoneField }} <small>({{ optionalText }})</small></label>
                </div>
                <div class="input-field">
                    <input class="input-text-field"
                           type="tel"
                           id="phoneinput"
                           name="phone"
                           v-model="phone"
                           value=""><br>
                </div>
            </div>
            <div class="input-div">
                <div class="input-field">
                    <label for="orgname">{{ organizationField }}</label>
                </div>
                <div class="input-field">
                    <input class="input-text-field"
                           type="text"
                           id="orgnameinput"
                           name="orgname"
                           v-model="orgName"
                           value=""><br>
                </div>
                <div class="input-field">
                    <div class="input-error" :class="{ 'show-error': !this.orgName && this.submitted}">
                        <p>Please input your company's name</p>
                    </div>
                </div>
            </div>
            <div class="input-div">
                <div class="input-field">
                    <label for="languagename">{{ languageText }}</label>
                </div>
                <div class="input-field pl-2">
                    <input type="radio" id="one" value="en" v-model="language">
                    <label for="one">English</label>
                    <input type="radio" id="two" value="spa" v-model="language">
                    <label for="two">Español</label>
                </div>
            </div>
            <div class="input-div">
                <div class="input-submit">
                    <button class="sign-up-button">{{ startButtonText }}</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import {
        enterYourInfo,
        enterYourInfoSub,
        nameField,
        emailField,
        phoneField,
        organizationField,
        startButtonText,
        languageText,
        optionalText
    } from '../copy/copy'

    export default {
        name: "SignUpField",
        data: () => ({
            name: null,
            email: null,
            phone: null,
            orgName: null,
            industry: '',
            //
            payload: {},
            //
            language: 'en',
            submitted: false
        }),
        computed: {
            enterYourInfo: function () {
                return enterYourInfo[this.language]
            },
            enterYourInfoSub: function () {
                return enterYourInfoSub[this.language]
            },
            nameField: function () {
                return nameField[this.language]
            },
            emailField: function () {
                return emailField[this.language]
            },
            phoneField: function () {
                return phoneField[this.language]
            },
            organizationField: function () {
                return organizationField[this.language]
            },
            startButtonText: function () {
                return startButtonText[this.language]
            },
            languageText: function () {
                return languageText[this.language]
            },
            optionalText: function () {
                return optionalText[this.language]
            },
            validEmail: function () {
                // eslint-disable-next-line no-useless-escape
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
                    return true
                }
                return false
            }
        },
        methods: {
            hashString: function(string) {
                var hash = 0, i, chr;
                for (i = 0; i < string.length; i++) {
                    chr   = string.charCodeAt(i);
                    hash  = ((hash << 5) - hash) + chr;
                    hash |= 0; // Convert to 32bit integer
                }
                console.log(hash)
                return hash + new Date().getTime();
            },
            checkForm: function (e) {
                console.log('submitted', e)
                this.submitted = true
                if (!this.name || !this.email ||
                    !this.orgName ||
                    !this.validEmail) {
                    e.preventDefault();
                } else {
                    this.payload = {
                        'Name': this.name,
                        'phone': '' + this.phone,
                        'emailAddress': this.email,
                        'companyName': this.orgName,
                        'industry': this.industry,
                        'demo': true,
                        jobKey: this.hashString(this.name + this.email + this.phone + this.orgName + this.industry) + '.csv'
                    }
                    this.$emit('submitted', this.payload, this.language)
                }

            }
        }
    }
</script>

<style scoped>
    /*@import url('../assets/css/index.css');*/
    .sign-up-header {
        width: 100%;
        margin-top: 24px;
    }
    .sign-up-title {
        font-weight: 400;
        font-size: 32px;
    }
    .sign-up-title p {
        margin-top: 12px;
        line-height: 120%;
    }
    .sign-up-subhead {
        margin: 0 15%;
        font-weight: 300;
        font-size: 18px;
    }
    .sign-up-subhead p {
        line-height: 120%;
        margin-bottom: 0;
    }
    .sign-up-container {
        border-radius: 10px;
        background-color: #ffffff;
        width: 100%;
        height: 100%;
    }
    .sign-up-form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
    }
    .input-div {
        width: 100%;
        flex-basis: 100%;
        padding: 6px 10%;
        display: flex;
        flex-flow: row wrap;
    }
    .input-field {
        width: 100%;
        flex-basis: 100%;
        text-align: left;
        font-weight: 300;
    }
    .input-submit {
        width: 100%;
        flex-basis: 100%;
        text-align: center;
        font-weight: 300;
        margin-top: 24px;
        margin-bottom: 18px;
    }
    .input-text-field {
        border-radius: 5px;
        border: 2px solid #CDCDCD;
        width: 100%;
        color: rgb(77, 99, 113);
        background-color: rgba(77, 99, 112, 0.1);
        font-weight: 300;
        font-size: 18px;
    }
    .input-error {
        display: none;
    }
    .input-error p {
        font-size: 12px;
        font-weight: 200;
        color: #721c24;
        margin-bottom: 0;
        margin-top: 2px;
        margin-left: 3px;
        line-height: 105%;
    }
    .show-error {
        display: block;
    }
    input + label {
        font-size: 1.2rem;
        width: auto !important;
        padding-left: 6px !important;
        padding-right: 12px;
        height: 2rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: inline-block !important;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border: none !important;
        border-radius: 0 !important;
        background: none !important;
        -webkit-transition: .1s all;
        transition: .1s all;
        cursor: pointer;
        z-index: 999 !important;
    }
    .sign-up-button {
        box-sizing: border-box;
        -webkit-appearance: none;
        display: inline-block;
        text-align: center;
        line-height: inherit;
        font-size: 12px;
        color: rgb(165, 187, 0);
        background-color: rgba(205, 205, 205, 0.3);
        cursor: pointer;
        width: fit-content;
        height: fit-content;
        border-radius: 10px;
        padding-left: 8px;
        padding-right: 8px;
        padding-top: 16px;
        padding-bottom: 16px;
        min-width: 152px;
        font-weight: bold;
        transition: 0.2s cubic-bezier(0.1, 0.7, 0.5, 0.1);
    }
    .sign-up-button:hover {
        color: rgba(0, 30, 97, 0.6);
        background-color: rgba(205, 205, 205, 0.7);
    }
</style>
