import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'VolunteersController.index');
    Route.post('/', 'VolunteersController.register');
    Route.get('/:volunteer_id', 'VolunteersController.show');
    Route.get('/request-help/:volunteer_id', 'VolunteersController.showRequestForHelp');
    Route.put('/:volunteer_id', 'VolunteersController.update');
    Route.put('/update-password/:volunteer_id', 'VolunteersController.updatePassword');
    Route.delete('/:volunteer_id', 'VolunteersController.destroy');
  }).prefix('/voluntary');

  Route.group(() => {
    Route.post('/', 'NeediesController.register');
    Route.get('/', 'NeediesController.index');
    Route.get('/:needy_id', 'NeediesController.show');
    Route.get('/request-help/:needy_id', 'NeediesController.showRequestForHelp');
    Route.put('/:needy_id', 'NeediesController.update');
    Route.put('/update-password/:needy_id', 'NeediesController.updatePassword');
    Route.delete('/:needy_id', 'NeediesController.destroy');
  }).prefix('/needy')

  Route.group(() => {
    Route.post('/voluntary', 'LoginController.volunteer')
    Route.post('/needy', 'LoginController.needy')
  }).prefix('/login');

  Route.group(() => {
    Route.get('/', 'HelpsController.index');
    Route.post('/', 'HelpsController.register');
    Route.get('/:help_id', 'HelpsController.show');
    Route.put('/:help_id', 'HelpsController.update');
    Route.put('/status/:help_id', 'HelpsController.updateStatus');
    Route.delete('/:help_id', 'HelpsController.destroy');
  }).prefix('/help')//.middleware('authorize');

  Route.group(() => {
    Route.post('/', 'VolunteerHelpersController.register');
    Route.get('/', 'VolunteerHelpersController.index');
    Route.get('/:volunteerHelper_id', 'VolunteerHelpersController.show');
    Route.put('/:volunteerHelper_id', 'VolunteerHelpersController.update');
    Route.delete('/:volunteerHelper_id', 'VolunteerHelpersController.destroy');
  }).prefix('/volunteer-helper')//.middleware('authorize')

  Route.group(() => {
    Route.group(() => {
      Route.post('/', 'ProfessionalVolunteersController.register');
      Route.get('/', 'ProfessionalVolunteersController.index');
      Route.get('/:professional_id', 'ProfessionalVolunteersController.show');
      Route.put('/:professional_id', 'ProfessionalVolunteersController.update');
      Route.delete('/:professional_id', 'ProfessionalVolunteersController.destroy');
    }).prefix('/data')
  }).prefix('/professional')

}).prefix('/tenants').middleware('tenantHandler')
