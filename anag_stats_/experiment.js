// Main file for the experiment 
// Following the timeline structure approach used by Bran 
// Outline:
// 1. Initialize the jsPsych scripts
// 2. Use conts to define each section of the experiment
    // a. Consent form
    // b. Instructions  *on pause atm
    // c. Practice trials (loop) *on pause atm
    // d. Main trials
    // e. Debrief & thank you *also on pause atm
// 3. Push to prolifirate
// ==============================
// Anagrammer statistics task LFolsom 24
// ==============================

// ------------------- 1. Initialize the jsPsych scripts ------------------- //

const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: true,
    on_finish: function(data) {
        //jsPsych.data.displayData('csv')
        proliferate.submit({"trials": data.values()});
    }
});
let timeline = [];


// ------------------- 2. Consent ------------------- //

// Consent form
const consent = {
    type: jsPsychInstructions, //name type of plugin
    pages: [
          "<p>Thank you for participating in our experiment,</p><p> please use the left and right keys to progress through the following consent form.</p>",
          "<p><b>STUDY TITLE:</b></p><p>Behavioral studies of decision making and executive function.</b></p><p>FOR QUESTIONS ABOUT THE STUDY, CONTACT: Dr. Russell Poldrack at [650-497-8488]</p><p><b>DESCRIPTION:</b></p><p>You are invited to participate in a research study that aims to understand human decision making, executive control (the management and coordination of cognitive processes), learning, and memory.  </p><p> We hope to learn more about the brain and cognitive mechanisms that support these cognitive abilities. As a young, healthy volunteer, you have been asked to participate in this study because our objective is to understand the cognitive functions supported by the healthy human brain. You will be asked to verify that you are between 18-50 years of age. You will be asked to attend to stimuli presented from a computer (usually visual or auditory) and then make a response (usually with hands or with saccadic eye movements) based upon the stimuli.</p>",
          "<p><i>You will be asked to make responses in one or more of the following conditions:</i></p><p> 1. Respond based upon your preferences between different presented options.</p><p> 2. Respond as quickly and accurately as possible to stimuli that are presented in succession.</p><p> 3. Learn a set of stimuli and later respond based upon your memory of the stimuli that you learned.</p><p> As your participation in the experiment is voluntary, you are free to discontinue the experiment at any point. At the discretion of the protocol director subjects may be taken out of this study due to unanticipated circumstances.</p><p><i> Some possible reasons for withdrawal are:</i></p><p> - failure to follow instructions</p><p>- the investigator decides that continuation would be harmful to you </p><p>-the study is canceled</p><p>-not meeting inclusion criteria</p>",
          "<p><b>TIME INVOLVEMENT:</b></p><p> Your participation in this experiment will take approximately 30-60minutes. Longer studies will be broken up across multiple study sessions. The specific length of the study that you will be completing will be in your study description.</p><p><b> RISKS AND BENEFITS:</b></p><p>There are no known risks associated with participation in this study. We cannot and do not guarantee or promise that you will receive any benefits from this study.</p><p><b>PAYMENTS:</b></p><p> As compensation for your participation, you will be paid at the rate listed on prolific at the end of the testing session.</p><p> There is no cost to you for this study.</p><p> There may be the potential to earn bonus pay based upon performance, or completion of the entire group of tasks. </p>",
          "<p><b>PARTICIPANT'S RIGHTS:</b></p><p> If you have read this form and have decided to participate in this project, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time without penalty or loss of benefits to which you are otherwise entitled. The alternative is not to participate. </p><p> You have the right to refuse to answer particular questions. The results of this research study may be presented at scientific or professional meetings or published in scientific journals.</p><p> Your individual privacy will be maintained in all published and written data resulting from the study. Identifiers might be removed from identifiable private information and, after such removal, the information could be used for future research studies or distributed to another investigator for future research studies without additional informed consent from you.",
          "<p><b>CONTACT INFORMATION:</b> </p><p> Questions: </p><p>  If you have any questions, concerns or complaints about this research, its procedures, risks and benefits, contact the Protocol Director, Dr. Russell Poldrack, at 650-497-8488.  </p><p> Independent Contact: </p><p> If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906, or email at irbnonmed@stanford.edu. </p><p>  You can also write to the Stanford IRB, Stanford University, 1705 El Camino Real, Palo Alto, CA 94306. </p><p>Please print a copy of this form for your records. </p><p> If you agree to participate in this research, please proceed to the study tasks.</p>"
     ],      
    // Define the button response
    key_forward: 'ArrowRight', // Define the key to move forward
    key_backward: 'ArrowLeft', // Define the key to move backward
    allow_backward: true, // Allow the participant to move backward
    button_label_previous: 'Back', // Define the label for the next button
    button_label_next: 'Next', // Define the label for the back button
    show_clickable_nav: 'True',
    // store the button response
    //on_finish: function(data) {
    //    data.category = 'consent'
   // }
};
// Push consent to timeline
timeline.push(consent);

//------------------- 3. Instructions ------------------- //
// Instructions


// ------------------- 4. Main trials ------------------- //
// Setting up the timeline variables
//// Setting up the stimuli and lists for the experiment

// Grab proliferate URL group id to define the set assignment used to filter stimuli
const urlParams = new URLSearchParams(window.location.search);
const set_name = urlParams.get('group_id') || 'A';  // Default to 'A' if group_id is not found
// Now we use that info in the create_tv_array function for filtering the stimuli set
// function for creating the timeline variables array (TV_array) is in the util.js file
let tv_array = create_tv_array(trial_objects, set_name);

//shuffleArray(tv_array)
console.log(tv_array)

// Block one //
//in the timeline section you're just describing what is in the window and what is going to be displayed
const blockA = {
    timeline: [
        {
            type: jsPsychAnagrammer,
            //button_text: 'Submit',
            //data: jsPsych.timelineVariable('blockA'),
            //text: jsPsych.timelineVariable('anagram'),
            allow_blanks: false,
            check_answers: false,
            prompt: 'Press enter to continue',
            /* mistake_fn: function() {
                alert("Please make sure you have entered a word.")
            }, */
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + tv_array.length));
                console.log("data.cond: "+data.cond)
            }
        },

    ],
    timeline_variables: tv_array

}
console.log(blockA)

timeline.push(blockA);
//const restA = "rest.js"
//timeline.push(restA);

/* // Block two //
const blockB = {
    timeline: [
        {
            type: jsPsychAnagrammer,
            button_text: 'Submit',
            data: jsPsych.timelineVariable('data'),
            text: jsPsych.timelineVariable('text'),
            allow_blanks: false,
            check_answers: false,
            prompt: 'Press enter to continue',
            mistake_fn: function() {
                alert("Please make sure you have entered a word.")
            },
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + tv_array.length));
                console.log("data.cond: "+data.cond)
            }
        },

    ],
    timeline_variables: tv_array,
    randomize_order: true

}
timeline.push(blockB);

//const restB = "rest.js"
//timeline.push(restB);

// Block three //
const blockC = {
    timeline: [
        {
            type: jsPsychAnagrammer,
            button_text: 'Submit',
            data: jsPsych.timelineVariable('data'),
            text: jsPsych.timelineVariable('text'),
            allow_blanks: false,
            check_answers: false,
            prompt: 'Press enter to continue',
            mistake_fn: function() {
                alert("Please make sure you have entered a word.")
            },
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + tv_array.length));
                console.log("data.cond: "+data.cond)
            }
        },

    ],
    timeline_variables: tv_array,
    randomize_order: true

}

timeline.push(blockC); */

// Debriefing & thank you
//const debrief = "debrief.js";
//timeline.push(debrief);

//------------------- 4. Push to proliferate / view ------------------- //
jsPsych.run(timeline);
