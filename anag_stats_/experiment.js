// Main file for the experiment 
// Following the timeline structure approach used by Bran 
// Outline:
// 1. Initialize the jsPsych scripts
// 2. Use conts to define each section of the experiment
    // a. Consent form
    // b. Instructions
    // c. Practice trials (loop)
    // d. Main trials
    // e. Debrief & thank you
// 3. Push to prolifirate
// ==============================
// Anagrammer statistics task LFolsom 24
// ==============================

// ------------------- 1. Initialize the jsPsych scripts ------------------- //

const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    on_finish: function(data) {
        proliferate.submit({"trials": data.values()});
    }
});
let timeline = [];

// ------------------- 2. Define each section of the experiment ------------------- //

// Consent form
const consent = {
    type: jsPsychExternalHtml, //name type of plugin
    stimulus: 'consent.html', //What the text says
    choices: ['I Consent'], //What the button says
    // when the participant clicks the button, the data is saved as 'consent'
    on_finish: function(data) {
        data.category = 'consent'} 
};
// Push consent to timeline
timeline.push(consent);

// Instructions
const instructions = {
    type: jsPsychExternalHtml,
    stimulus: 'instructions.html',
    choices: ['Next'],
    on_finish: function(data) {
        data.category = 'instructions'}
};
timeline.push(instructions);

// Practice trials
//// We create a loop over the practice trials
const practice = {
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
    randomize_order: false
};
timeline.push(practice);

// ------------------- 3. Main trials ------------------- //
//// Setting up the stimuli and lists for the experiment
let tv_array = create_tv_array(trial_objects)
shuffleArray(tv_array)
console.log(tv_array.length)

// Block A //
const blockA = {
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

const restA = {
    timeline: [
        {
            type: jsPsychExternalHtml,
            stimulus: 'rest.html',
            choices: ['Continue']
        },
    ],

}

// Block B //

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

const restB = {
    timeline: [
        {
            type: jsPsychExternalHtml,
            stimulus: 'rest.html',
            choices: ['Continue']
        },
    ],

}

// Block C //

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

//// Pushing the blocks to the timeline
timeline.push(blockA);
timeline.push(restA);
timeline.push(blockB);
timeline.push(restB);
timeline.push(blockC);
// Debriefing & thank you
const debrief = {
    type: jsPsychExternalHtml,
    stimulus: 'debrief.html',
    choices: ['Exit to Prolific'],
    on_finish: function(data) {
        data.category = 'debrief'
    }
};

//------------------- 3. Push to proliferate ------------------- //
jsPsych.run(timeline);
console.log("holyshit it's working!")
