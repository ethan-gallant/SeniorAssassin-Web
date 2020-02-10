<template>
    <div class="rules">
        <div class="container">
            <div class="has-text-centered rules-title">
                <h1>sENIOR aSSASSIN rULES</h1>

                <p>Rules are at the discretion Josie Rooney and Mr. Jenkins. You will be disqualified if you break any
                    of these rules, laws or any rules of LJCDS</p>
                <div class="column">
                    <div class="btn-wrapper">
                        <router-link to="/dashboard" class="brk-btn-grey brk-btn">Return to Dashboard</router-link>
                    </div>
                </div>
            </div>

            <section class="accordions">
                <article @click="acc1 = !acc1" class="accordion" :class="{ 'is-active': acc1 }">
                    <div class="accordion-header toggle">
                        <p>Points</p>
                    </div>
                    <div class="accordion-body">
                        <div class="accordion-content">
                            <ul class="rule-list">
                                <li class="rule-item">You get points when you kill your target</li>

                                <ul class="rule-list">
                                    <li class="rule-item">How long it takes you to kill your target (the day you get
                                        your target=3 points, 1 day=2 points, 2 days=1 point, 3 days=.5)
                                    </li>
                                    <li class="rule-item">How many people they have killed up to that point (1 killed=1
                                        point, 2 killed=2 points, etc.)
                                    </li>
                                    <li class="rule-item">If they’re on the bounty list (5 points)</li>
                                </ul>
                                <li class="rule-item">When you get enough points, you can use them in a shop to get
                                    intel on your target’s class schedule, who has you, etc.
                                </li>
                                <li class="rule-item">Also with points, you can “hire” a certain teacher to get your
                                    target
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
                <article @click="acc2 = !acc2" class="accordion" :class="{ 'is-active': acc2 }">
                    <div class="accordion-header toggle">
                        <p>Safe Zones</p>
                    </div>
                    <div class="accordion-body">
                        <div class="accordion-content">
                            <ul class="rule-list">
                                <li class="rule-item">Bathroom</li>
                                <li class="rule-item">Bell tower between the times of 10:00 am and 1:00 pm</li>
                                <li class="rule-item">Religious places</li>
                                <li class="rule-item">Library and Library lobby</li>
                                <li class="rule-item">Classrooms (while class is in session and in passing periods)(you can't camp out in classrooms)</li>
                                <li class="rule-item">Inside cars</li>
                                <li class="rule-item">Work</li>
                                <li class="rule-item">If you’re playing a sport, you’re safe, if you’re spectating
                                    you’re fair game
                                </li>
                                <li class="rule-item">This will be played off campus as well, but there will not be
                                    breaking and entering into anyone’s home, you must be invited
                                </li>
                                <ul class="rule-list">
                                    <li class="rule-item">In addition, if any adult tells you to leave their property or
                                        anywhere else for that matter, you leave immediately or risk being eliminated
                                    </li>
                                    <li class="rule-item">Just don’t be stupid</li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </article>
                <article @click="acc3 = !acc3" class="accordion" :class="{ 'is-active': acc3 }">
                    <div class="accordion-header toggle">
                        <p>Targets</p>
                    </div>
                    <div class="accordion-body">
                        <div class="accordion-content">
                            <ul class="rule-list">
                                <li class="rule-item">Once you get a target, you have 3 days to get them out</li>
                                <ul class="rule-list">
                                    <li class="rule-item">If you don’t, you’re on the bounty list where anyone can kill
                                        you and get extra points until you kill your original target
                                    </li>
                                    <li class="rule-item">The longer you’re on the bounty list, the more points you are
                                        worth
                                    </li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </article>
                <article @click="acc4 = !acc4" class="accordion" :class="{ 'is-active': acc4 }">
                    <div class="accordion-header toggle">
                        <p>Purge Day</p>
                    </div>
                    <div class="accordion-body">
                        <div class="accordion-content">
                            <ul class="rule-list">
                                <li class="rule-item">The horn will sound at 8:00 am and once again at 3:00 pm to signal
                                    the beginning and end of the purge day
                                </li>
                                <li class="rule-item"></li>
                            </ul>
                        </div>
                    </div>
                </article>
                <article @click="acc5 = !acc5" class="accordion" :class="{ 'is-active': acc5}">
                    <div class="accordion-header toggle">
                        <p>Teachers</p>
                    </div>
                    <div class="accordion-body">
                        <div class="accordion-content">
                            <ul class="rule-list">
                                <li class="rule-item">Teachers will be available for hire</li>

                                <li class="rule-item">There will be a list of teachers who want to participate in
                                    assassin on the website, so you can choose from those
                                </li>
                                <li class="rule-item">If the teacher you want to hire is already bought, you cannot pick
                                    that teacher
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
                <article @click="acc6 = !acc6" class="accordion" :class="{ 'is-active': acc6 }">
                    <div class="accordion-header toggle">
                        <p>How to assassinate</p>
                    </div>
                    <div class="accordion-body">
                        <div class="accordion-content">
                            <ul class="rule-list">
                                <li class="rule-item red">You must use your own stickers</li>
                                <li class="rule-item">Stickers have been decided as the weapon of choice this year</li>

                                <li class="rule-item">You must place the sticker on the arm below the elbow</li>
                                <li class="rule-item">Once you do, take a photo and submit it on the website for proof
                                </li>
                                <li class="rule-item">There, you will then be assigned your next target</li>
                                <li class="rule-item red">*You may get other people to help you with your assassination,
                                    however they may not come into physical contact (ie. holding, grabbing, etc.) with
                                    your target*
                                </li>
                                <li class="rule-item red">The person who is assigned the target MUST be the one to place the sticker </li>
                            </ul>
                        </div>
                    </div>
                </article>
                <article @click="acc7 = !acc7" class="accordion" :class="{ 'is-active': acc7 }">
                    <div class="accordion-header toggle">
                        <p>Stats</p>
                    </div>
                    <div class="accordion-body">
                        <div class="accordion-content">
                            <ul class="rule-list">
                                <li class="rule-item">There are three statistics that will be rewarded at the end of the
                                    two weeks:
                                </li>
                                <ul class="rule-list">
                                    <li class="rule-item">Most kills overall</li>
                                    <li class="rule-item">Most kills in one day</li>
                                    <li class="rule-item">Kill of the week </li>
                                    <ul class="rule-list">
                                        <li class="rule-item">
                                            One for each week
                                        </li>
                                    </ul>
                                </ul>

                            </ul>
                        </div>
                    </div>
                </article>
                <article @click="acc8 = !acc8" class="accordion" :class="{ 'is-active': acc8 }">
                    <div class="accordion-header toggle">
                        <p>How to stay safe!</p>
                    </div>
                    <div class="accordion-body">
                        <div class="accordion-content">
                            <ul class="rule-list">
                                <li class="rule-item">There will be many different ways to stay safe during the course of the game</li>

                                <li class="rule-item">
                                    They will be posted on the website home page
                                </li>
                                <li class="rule-item">Just to be clear: there will not be ONE way to stay safe throughout the entire game, it will change every couple of days</li>
                            </ul>
                        </div>
                    </div>
                </article>
                <div class="rules-title">
                    <p class=" has-text-centered red">
                        PLEASE PLEASE PLEASE BE HONEST AND DON'T ARGUE THAT YOU WEREN’T KILLED WHEN YOU KNOW YOU WERE.  Be a good sport and accept defeat.
                    </p>
                </div>

            </section>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Rules",
        data: () => {
            return {
                acc1: false,
                acc2: false,
                acc3: false,
                acc4: false,
                acc5: false,
                acc6: false,
                acc7: false,
                acc8: false,
                acc9: false,


            }
        }

    }
</script>

<style scoped>
    .accordions .accordion {
        background-color: inherit !important;
        width: 90%;
        margin: auto;
    }

    .rules-title h1 {
        margin-top: 10%;
        font-size: 2em;
        font-family: 'mad_hackerregular', sans-serif;

    }

    .rules-title p {
        margin-bottom: 5%;
    }

    .rule-list {
        list-style: disc;
        padding-left: 10px;

    }

    .rule-item {

    }

    .red {
        color: red;
    }
</style>