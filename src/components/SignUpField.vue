<template>
    <div class="sign-up-container">
        <div class="sign-up-header">
            <div class="sign-up-title">
                <p>
                    Enter your information to get started
                </p>
            </div>
            <div class="sign-up-subhead">
                <p>
                    This will help us personalize your results and assist you in your program calibration
                </p>
            </div>
        </div>
        <form
            class="sign-up-form"
            @submit="checkForm"
            method="post">
            <div class="input-div">
                <div class="input-field">
                    <label for="fname">Name</label>
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
                    <label for="email">Email</label>
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
                    <div class="input-error" :class="{ 'show-error': !this.validEmail && this.email && this.submitted}">
                        <p>Please input a valid email</p>
                    </div>
                </div>
            </div>
            <div class="input-div">
                <div class="input-field">
                    <label for="phone">Phone Number</label>
                </div>
                <div class="input-field">
                    <input class="input-text-field"
                           type="text"
                           id="phoneinput"
                           name="phone"
                           v-model="phone"
                           value=""><br>
                </div>
            </div>
            <div class="input-div">
                <div class="input-field">
                    <label for="orgname">Organization Name</label>
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
                        <p>Please input your organizations name</p>
                    </div>
                </div>
            </div>
            <div class="input-div">
                <div class="input-field">
                    <label for="orgname">Industry</label>
                </div>
                <div class="input-field">
                    <select v-model="industry"
                            class="input-text-field"
                            id="industry">
                        <option value="Accommodation">Accommodation</option>
                        <option value="Accommodation and Food Services">Accommodation and Food Services</option>
                        <option value="Administrative and Support Services">Administrative and Support Services</option>
                        <option value="Agriculture, Forestry, Fishing and Hunting">Agriculture, Forestry, Fishing and Hunting</option>
                        <option value="Beverage and Tobacco Product Manufacturing">Beverage and Tobacco Product Manufacturing</option>
                        <option value="Clothing and Clothing Accessories Stores">Clothing and Clothing Accessories Stores</option>
                        <option value="Computer and Electronic Product Manufacturing">Computer and Electronic Product Manufacturing</option>
                        <option value="Merchant Wholesalers, Nondurable Goods">Merchant Wholesalers, Nondurable Goods</option>
                        <option value="
Wholesale Electronic Markets and Agents and Brokers">
                            Wholesale Electronic Markets and Agents and Brokers</option>
                    </select>
                </div>
                <div class="input-field">
                    <div class="input-error" :class="{ 'show-error': !this.industry && this.submitted}">
                        <p>Please select your industry</p>
                    </div>
                </div>
            </div>
            <div class="input-div">
                <div class="input-submit">
                    <button class="sign-up-button">Start the Assessment</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "SignUpField",
        data: () => ({
            name: null,
            email: null,
            phone: null,
            orgName: null,
            industry: null,
            //
            submitted: false
        }),
        computed: {
            validEmail: function () {
                // eslint-disable-next-line no-useless-escape
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
                {
                    return true
                }
                return false
            }
        },
        methods: {
            checkForm: function (e) {
                e.preventDefault();
                console.log('submitted', e)
                this.submitted = true

            }
        }
    }
</script>

<style scoped>
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