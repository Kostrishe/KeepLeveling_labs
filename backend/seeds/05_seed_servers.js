exports.seed = async function(knex) {
  await knex("servers").del();
  await knex("servers").insert([
    { ip_address: '192.168.1.1', location: 'Москва', status_id: 1 },
    { ip_address: '192.168.1.2', location: 'Санкт-Петербург', status_id: 2 }
  ]);
};