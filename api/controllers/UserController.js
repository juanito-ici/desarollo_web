/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create:function (req,res) {
		User.create(req.params.all(), function userCreated(err, user) {
                  if (err) console.log(err);
                  res.redirect('/'); 
                });
		
	},
	mostrar:function(req,res){
		User.find(function foundUser (err, users) {
                if(err) console.log(err);
                return res.view('muestra',{
                  users: users
                });
              });		
	},
	delete:function(req,res){
		var id = req.param('id');
		if (!id) return res.send("No id.",500);

		User.find(id, function foundUser(err, user) {
			if (err) return res.send(err,500);
			if (!user) return res.send("No existe usuario",404);

			User.destroy(id, function userDestroyed(err) {
				if (err) return res.send(err,500);

				return res.redirect('/');
			});
			
		})
	},

	edit:function(req,res){
		var id = req.param('id');

		User.find(id,function(err,user){
			if(err) return res.send(err);
			else {
				return res.view('editar',{user:user});

			}

		}) 

	},

	update:function(req,res){
		var param = req.params.all();
		var id = param.id;
		User.update(id,param,function(err,user){
			if(err) return res.send(err);
			else{

				return res.redirect('/');

			}

		});
	}
	
};

