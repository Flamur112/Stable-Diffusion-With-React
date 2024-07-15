import { Controller, Get, Post, HttpCode, Redirect, Param, HostParam, Body, Patch, Delete, Query } from '@nestjs/common';
import { UsersService }  from './users.service';

@Controller('users') // /users
export class UsersController {

    constructor(private readonly usersService: UsersService) {} // curly braced there to not see all red shit

    @Get() // GET /users r /users?role=value&age=42
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){ // findAll method. role?: , the ? stands for optional so that if a parameter is declared without '?' like 'role: string' then it means that when you call the function or method you must provide a 'role'.
        return this.usersService.findAll(role)
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string) {
        return  this.usersService.findOne(+id) // the + before id is called a unary plus which transforms the type into integer cause in the findOne method from the users.service.ts logic we defined it as an integer but iin the controller method we defined it as a function. And if we use the + before the variable and its already a variable it will have no effect.
    }

    @Post() // POST /users
    create(@Body() user: { name: string, email: string,  role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        return this.usersService.create(user)
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id')id: string, @Body() userUpdate: { name?: string, email?: string,  role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }){ // userUpdate is a variable name the : {} gives userUpdate a type object
        return this.usersService.update(+id, userUpdate)
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id') id: string){
        return this.usersService.delete(+id) // the + before the id stands for unary plus. It transforms the type to a number as its a string in this methid.
    }

    // @Patch(':id') // PATCH /users/:id
    // update(@Param('id')id: string, @Body() userUpdate: {}){
    //     return { id,  ...userUpdate }
    // }

    // @Post('create') // slugs it automatically
    // createUser(): string    
    // {
    //     return 'user created';
    // }

    // @Get('path') // slugs it automatically
    // getUserscc() : string {
    //     return '3@#@14';
    // }

    // @Get('ab*cd')
    // findAll() {
    //     return 'This route uses a wildcard';
    // }

    // @Get('redirect')
    // @Redirect('https://www.google.com', 301)// url, statuscode
    // getGoogle() {
    //     return 'This route redirects to google';
    // }

    // @Get(':id')
    // findOne(@Param('id')  id: string): string{
    //     console.log(id)
    //     return `This action returns a #${id} user`;
    // }



// @Controller({ host: ':asda@gmail.com'})
// export class AccountController {
//     @Get()
//     getInfo(@HostParam('account') account: string){
//         return account
//      }
    
}