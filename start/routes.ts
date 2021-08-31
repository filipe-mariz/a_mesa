import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'VolunteersController.index')
    Route.post('/', 'VolunteersController.register')
  }).prefix('/voluntary')

}).prefix('/tenants')//.middleware('tenantHandler')

/* Route.group(() => {
  Route.group(() => {
    Route.post('/', 'VoluntariesController.register')
    Route.get('/', 'VoluntariesController.index')
    Route.get('/:id', 'VoluntariesController.show')
    Route.get('/forgot-password/:id', 'VoluntariesController.forgotPassword')
    Route.put('/:id', 'VoluntariesController.update')
    Route.put('/update-password/:id', 'VoluntariesController.updatePassword')
  }).prefix('/voluntary')
}).prefix('/tenants').middleware('tenantHandler') */

Route.post('/', 'VolunteersController.register')
