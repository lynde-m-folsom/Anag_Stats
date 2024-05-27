function create_tv_array(json_object) {
    let tv_array = [];
    for (let i = 0; i < json_object.length; i++) {
        obj = {};
        obj.text = json_object[i].text;
        obj.data = {};
        obj.data.id = json_object[i].id;
        obj.data.conj1 = json_object[i].conj1;
        obj.data.conj2 = json_object[i].conj2;
        obj.data.text = json_object[i].text;
        obj.data.conj1_num = json_object[i].conj1_num;
        obj.data.conj2_num = json_object[i].conj2_num;
        obj.data.conj1_per = json_object[i].conj1_per;
        obj.data.conj2_per = json_object[i].conj2_per;
        obj.data.dataType = json_object[i].dataType;
        obj.data.cond = json_object[i].condition;
        tv_array.push(obj)
    }
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