
/// Custom  plugin for the anagram task. This plugin is a modified version of the cloze plugin used by Bran.
//This plugin uses time outs and limits. It will end the experiment if the time out limit is reached. 
//When the a number of time outs are reached, the experiment is ended.
// Lynde Folsom for Anagram experiments. 2024

let mistakes = 0; // start with zero mistakes 

function handleMistake() {
    console.log("Mistakes were made");
    // Add mistake to the counter
    mistakes++; 
    console.log(mistakes);
} 

var jsPsychAnagrammer = (function (jspsych) {
    'use strict';
  // these are the args that the function calls
    const info = {
        name: "gram",
        parameters: {
            anagram: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Anagram",
                default: "Problem with the anagram text.",
                description: "The anagram text to be displayed."
            },
            correct: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Correct",
                description: "The correct answer to the anagram."
            },
            id: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "ID",
                description: "The ID of the trial."
            },
            type: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Type",
                description: "The type of the trial."
            },
            set: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Set",
                description: "The set of the anagrams."
            },
            setRun: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Set Run",
                description: "The set run of the trials."
            },
            prompt: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Prompt",
                default: null,
                description: "Any content here will be displayed below the stimulus."
            },
            check_answers: { // this will need to look at the VALID object
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Check answers",
                default: false,
                description: "Whether to check answers against solutions."
            },
            allow_blanks: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Allow blanks",
                default: true,
                description: "Whether to allow blanks in the responses."
            },
            mistake_fn: {
                type: jspsych.ParameterType.FUNCTION,
                pretty_name: "Mistake function",
                default: () => {},
                description: "Function to call when a mistake is made."
            },
            trial_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Trial duration",
                default: null,
            },
        }
    };
// This is the class and plugin functionallity details
    class GramPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        } // Constructor is the function that is used for creating the object
         // Trial is the function that is used to display the trial and it's details
        trial(display_element, trial) {
            var start_time = performance.now(); // Start time of the trial
            let timeoutAttempts = 0; // Number of timeout attempts
            const maxTimeoutAttempts = 3; // Maximum number of timeouts

            // Create the HTML for the trial
            let html = `<div class="gram">${trial.anagram}</div>`;
            html += `<input class="inputBox" onpaste="return false" type="text" id="inputBox" value="">`;
            if (trial.prompt !== null) { // If there is a prompt, display it
                html += `<br><br><div id="jspsych-html-button-response-prompt" style="font-size:90%"><strong>${trial.prompt}</strong></div>`;
            }
            display_element.innerHTML = html;
            // Response handling preface set up the space for the vars
            var response = {
                rt: null,
                key: null,
                stimulus: trial.anagram,
                id: trial.id,
                setRun: trial.setRun,
                valid: trial.valid, // this will add the valid answers to the response object
            };
            // Function to check the response is not blank
            const check = () => {
                const user_response = document.getElementById('inputBox').value.trim();
                const answers = [user_response];
                let answers_correct = false;
                let answers_filled = true;
            
                // // Check if the answer is blank and whether blanks are allowed
                if (!trial.allow_blanks && user_response === "") {
                     alert("Please enter a response.")
                     answers_filled = false;
                //     //return; // Exit early if blanks are not allowed
                } else {
            
                // Check if the answer is correct if required
                if (trial.check_answers) {
                    if (!trial.correct.includes(user_response)) {
                        document.getElementById('inputBox').style.color = 'grey'; // Mark answer as incorrect visually
                        //answers_correct = false;
                    } else {
                        document.getElementById('inputBox').style.color = 'black'; // Reset the color for correct answers
                        answers_correct = true;
                    }

                }
            
                // Prepare trial data for storage
                const trial_data = {
                    response: user_response,
                    rt: response.rt,
                    id: trial.id,
                    anagram: trial.anagram,
                    set: trial.set,
                    setRun: trial.setRun,
                    correct: trial.correct,
                    answer_correct: answers_correct,
                };
            
                // Handle incorrect answers
                if (trial.check_answers && !answers_correct && answers_filled) {
                    trial.mistake_fn(); // Call the mistake handler
                    trial_data.response = "mistake"; // Mark the response as a mistake
                    // console.log(`Mistake on ` + trial.id + `: ` + user_response);
                    // console.log(`${mistakes} mistakes made so far`);
                    this.jsPsych.finishTrial(trial_data); // End the trial with mistake data
                } else {
                    // Valid response, finish trial with the recorded data
                    display_element.innerHTML = "";
                    this.jsPsych.finishTrial(trial_data);
                }
            }
            };
            

            // Look for enter key press to trigger the end of the trial
            const enterPress = (event) => { // Enter is to proceed otherwise we wait for response
                if (event.key === "Enter") {
                    event.preventDefault();
                    response.key = document.getElementById('inputBox').value;
                    response.rt = performance.now() - start_time;
                    check();
                }
            };
            
            // If the trial duration is set, this function describes time out handling. As of now, the trial duration is set to null
            const end_trial = () => {
                timeoutAttempts++;
                // If the number of timeout attempts is greater than the maximum, end the experiment
                if (timeoutAttempts > maxTimeoutAttempts && trial.trial_duration !== null) {
                    display_element.innerHTML = "Experiment has been cancelled due to inactivity.";
                    this.jsPsych.pluginAPI.clearAllTimeouts();
                    this.jsPsych.endExperiment("Experiment cancelled due to inactivity.");
                } else {
                    display_element.innerHTML = "<p>Reminder, if you get stuck you can type <b>'idk'</b> into the box.</p> <p><b>Press Space to return to the experiment</b></p>"; 
                    const spacePress = (event) => {
                        if (event.key === " ") {
                            document.removeEventListener("keypress", spacePress);
                            this.jsPsych.pluginAPI.clearAllTimeouts();
                            this.trial(display_element, trial);
                        }
                    };
                    // adding console logs to see what the trial info is 
                    console.log(`This is trial: ${trial.anagram}`);
                    console.log(`Trial data: ${this.jsPsych.data.get().last(1).values()[0]}`);
                    document.addEventListener("keypress", spacePress);
                    this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
                    // this.jsPsych.pluginAPI.clearAllTimeouts(); <- doesn't address the core problem of which trial is being returned
                }
            };
            if (trial.trial_duration !== null) {
              //  this.jsPsych.pluginAPI.clearAllTimeouts();
                this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
            }

            // The event listener for enter key press
            display_element.querySelector(".inputBox").addEventListener("keypress", enterPress);
            display_element.querySelector(".inputBox").focus();
        } // End of trial

        // Simulate trial (important for testing) ---------------------------------------------------
        simulate(trial, simulation_mode, simulation_options, load_callback) {
            if (simulation_mode === "data-only") {
                load_callback();
                this.simulate_data_only(trial, simulation_options);
            }
            if (simulation_mode === "visual") {
                this.simulate_visual(trial, simulation_options, load_callback);
            }
        }

        create_simulation_data(trial, simulation_options) {
            const response = trial.correct || this.jsPsych.randomization.randomWords({ exactly: 1 })[0];
            const default_data = {
                response: response,
                id: trial.id,
                type: trial.type,
                set: trial.set,
                correct: trial.valid, // consider change the naming so that this is more clear, bc correct == the root while valid is all possible solutions
                setRun: trial.setRun,
            };
            return this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
        }

        simulate_data_only(trial, simulation_options) {
            const data = this.create_simulation_data(trial, simulation_options);
            this.jsPsych.finishTrial(data);
        }

        simulate_visual(trial, simulation_options, load_callback) {
            const data = this.create_simulation_data(trial, simulation_options);
            const display_element = this.jsPsych.getDisplayElement();
            this.trial(display_element, trial);
            load_callback();
            const inputs = display_element.querySelectorAll('input[type="text"]');
            let rt = this.jsPsych.randomization.sampleExGaussian(750, 200, 0.01, true);
            for (let i = 0; i < data.response.length; i++) {
                this.jsPsych.pluginAPI.fillTextInput(inputs[i], data.response[i], rt);
                rt += this.jsPsych.randomization.sampleExGaussian(750, 200, 0.01, true);
            }
            this.jsPsych.pluginAPI.clickTarget(display_element.querySelector("#finish_gram_button"), rt);
        }
    }

    GramPlugin.info = info;

    return GramPlugin;

})(jsPsychModule);
