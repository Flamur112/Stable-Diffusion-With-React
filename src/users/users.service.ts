// the logic for the users.controller.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService { //creates a class called UsersService and allows for it to be exported aka used in another file.
    private users = [
        {
          "id": 1,
          "name": "John Doe",
          "email": "john.doe@example.com",
          "role": "ADMIN"
        },
        {
          "id": 2,
          "name": "Jane Smith",
          "email": "jane.smith@example.com",
          "role": "ENGINEER"
        },
        {
          "id": 3,
          "name": "Michael Johnson",
          "email": "michael.johnson@example.com",
          "role": "INTERN"
        },
        {
          "id": 4,
          "name": "Emily Brown",
          "email": "emily.brown@example.com",
          "role": "ENGINEER"
        },
        {
          "id": 5,
          "name": "Alexis Davis",
          "email": "alexis.davis@example.com",
          "role": "ADMIN"
        }
      ]

      findAll(role?: 'INTERN' | 'ENGINEER'| 'ADMIN'){ // declaring the findALL method and then the role?: is declaring the role variable and assigning the values represented afterwards.
        if (role) { // if role is truthy (if it has a value)
            const rolesArray = this.users.filter(user => user.role === role) // return this.database.filter out. The user => is calling the user method and then for every user with role property equal to the role. If role is === to the role of the users 'role' property then return the users whole array.

            if (rolesArray.length === 0) throw new NotFoundException('User Role Not Found')
            return rolesArray
        }
        return this.users // return the entire array of users stored in the UsersService class.
      }

      findOne(id: number){
        const user = this.users.find(user => user.id === id) // finds and locates the first element of the user.id that is equal to the number.
        if (!user) throw new NotFoundException('User Not Found')

        return user
      }

      create(CreateUserDto: CreateUserDto) { // we give the user variable the object literal of {name: string, email: string,  role: 'INTERN' | 'ENGINEER' | 'ADMIN'}
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id) // making sure and setting usersByHighestId[0] will have the highest 'id'.
        const newUser = { // Increments the id of the highest user by 1 to create a new unique id for newUser
            id: usersByHighestId[0].id + 1,
            ...CreateUserDto
        }
        this.users.push(newUser) // add the new array to the end of the user.id 
        return newUser
      }

      update( id: number, UpdateUserDto: UpdateUserDto){
        this.users = this.users.map(user => {
            if ( user.id === id ) {
                return { ...user, ...UpdateUserDto }
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number){
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id) // the user.id that you chose will

        return removedUser
    }

}