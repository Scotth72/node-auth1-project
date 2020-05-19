exports.up = function(knex) {
	return knex.schema.createTable('users', (tbl) => {
		tbl.increments('id');
		tbl.string('username', 25).notNullable().unique();
		tbl.string('password', 128).notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('users');
};
