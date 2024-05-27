function create_tv_array(json_object, set_name) {
    let tv_array = [];

    // Filter stimuli based on the set name
    let filtered_stimuli = json_object.filter(item => item.set === set_name);

    // Group stimuli by type and select 10 of each type
    let types = ["Four-Letter", "Five-Letter", "Six-Letter"];
    types.forEach(type => {
        let type_stimuli = filtered_stimuli.filter(item => item.type === type).slice(0, 10);
        type_stimuli.forEach(stimulus => {
            let obj = {};
            obj.text = stimulus.anagram;  // The anagram is shown as the stimulus
            obj.data = {
                id: stimulus.id,
                type: stimulus.type,
                anagram: stimulus.anagram,
                correct: stimulus.correct,
                set: stimulus.set
            };
            tv_array.push(obj);
        });
    });

    return tv_array;
}


// Preliminary Functions //

// Define Function Using the Fisher-Yates (Knuth) Shuffle Algorithm to randomize stimulus selection //
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

function check_dupes(tv_array) {
    let tv_array_modded = shuffleArray(tv_array);
    console.log("TEST: "+tv_array_modded);
    let final_array = [];
    let unique_list = [];
    for (let i = 0; i < tv_array_modded.length; i++) {
        if (!unique_list.includes(tv_array_modded[i].data.item)) {
            // console.log(tv_array_modded[i].data.item);
            final_array.push(tv_array_modded[i]);
            unique_list.push(tv_array_modded[i].data.item);
        }
    }
    return final_array;
}