exports.seed = function(knex) {
	const users = [
		{
			username: 'test',
			password: 'test'
		},
		{
			username: 'test1',
			password: 'test1'
		},
		{
			username: 'test2',
			password: 'test2'
		},
		{
			username: 'test3',
			password: 'test3'
		},
		{
			username: 'test4',
			password: 'test4'
		},
		{
			username: 'test5',
			password: 'test5'
		}
	];

	return knex('users').insert(users);
};
