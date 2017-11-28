/**
 * StudentController
 *
 * @description :: Server-side logic for managing students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create:function (req,res) {
		Student.create(req.params.all(), function studentCreated(err, student) {
                  if (err) console.log(err);
                  res.redirect('/'); 
                });
		
	},
	mostrar:function(req,res){
		Student.find(function foundStudent (err, students) {
                if(err) console.log(err);
                return res.view('muestra',{
                  students: students
                });
              });		
	},
	delete:function(req,res){
		var id = req.param('id');
		if (!id) return res.send("No id.",500);

		Student.find(id, function foundStudent(err, student) {
			if (err) return res.send(err,500);
			if (!student) return res.send("No existe usuario",404);

			Student.destroy(id, function studentDestroyed(err) {
				if (err) return res.send(err,500);

				return res.redirect('/');
			});
			
		})
	},

	edit:function(req,res){
		var id = req.param('id');

		Student.find(id,function(err,student){
			if(err) return res.send(err);
			else {
				return res.view('editar',{student:student});

			}

		}) 

	},

	update:function(req,res){
		var param = req.params.all();
		var id = param.id;
		Student.update(id,param,function(err,student){
			if(err) return res.send(err);
			else{

				return res.redirect('/');

			}

		});
	}
	
};

