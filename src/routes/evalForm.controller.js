const knex = require('../utils/knex');

function submitForm(req, res) {
  const now = new Date();
  const submited = `${now.getDate()}-${
    now.getMonth() + 1
  }-${now.getFullYear()}`;
  // *Getting references from answers database
  knex('answers').select().where();

  // *Inserting form data into database
  const {
    est_no_of_students,
    immdediate_attention,
    sitting_arrangement,
    lighting,
    chairs_and_tables,
    room_ventilation,
    board,
    public_address_sys,
    fixed_lcd_projector_sys,
    display_and_visibility,
    general_phy_condition,
    other,
  } = req.body;
  /* {evaluator_id,
    lesson_id,
    teaching_mode,
    teaching_method,
    style_of_teaching,
    medium_of_instruction,
    tch_conducted,
    rsn_not_conducted,
    tch_stt_time,
    rsn_late_stt;} */
  knex('form_entries')
    .insert({
      submited,
      est_no_of_students,
      immdediate_attention,
      sitting_arrangement,
      lighting,
      chairs_and_tables,
      room_ventilation,
      board,
      public_address_sys,
      fixed_lcd_projector_sys,
      display_and_visibility,
      general_phy_condition,
      other,
    })
    .then((form_data) => {
      return res.status(200).json({ form_data: form_data });
    });
}

module.exports = {
  submitForm,
};
