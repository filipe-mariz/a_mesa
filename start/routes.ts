import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'VoluntariesController.register')
    Route.get('/', 'VoluntariesController.index')
    Route.get('/:id', 'VoluntariesController.show')
    Route.get('/forgot-password/:id', 'VoluntariesController.forgotPassword')
    Route.put('/:id', 'VoluntariesController.update')
    Route.put('/update-password/:id', 'VoluntariesController.updatePassword')
  }).prefix('/voluntary')
}).prefix('/tenants').middleware('tenantHandler')

Route.post('/', 'VolunteersController.register')