// import User from "@/models/user.model";
// import Task from "@/models/task.model";
// import Project from "@/models/project.model";
// import { faker } from "@faker-js/faker";
// import { PROJECT_STATUS, TASK_STATUS, TASK_PRIORITY, ROLE } from "@/constant";
// import { User as IUser, Project as IProject, Task as ITask } from "@/index";
// import { connect } from "@/utils/db";
// const seed = async () => {
//   console.log("Seeding started");
//   await connect();
  
//   await User.deleteMany({});
//   await Project.deleteMany({});
//   await Task.deleteMany({});

//   console.log("Seeding started");

//   const users = await createFakeUsers();
//   const dbUsers = await User.insertMany(users);
//   const projects = await createFakeProjects(dbUsers);
//   const dbProjects = await Project.insertMany(projects);
//   const tasks = await createFakeTasks(dbUsers, dbProjects);
//   const dbTasks = await Task.insertMany(tasks);

//   console.log("Seeding completed");
// };

// const createFakeUsers = async (): Promise<IUser[]> => {
//   const users = Array.from({ length: 10 }, () => ({
//     name: faker.person.fullName(),
//     email: faker.internet.email(),
//     avatar: faker.image.avatar(),
//     role: faker.helpers.arrayElement(Object.values(ROLE)),
//   }));
//   return await User.insertMany(users);
// };

// const createFakeProjects = async (users: IUser[]): Promise<IProject[]> => {
//   const projects = Array.from({ length: 10 }, () => ({
//     title: faker.lorem.sentence().slice(0, 20),
//     desc: faker.lorem.paragraph().slice(0, 50),
//     members: faker.helpers.arrayElements(users.map(user => user._id && user.role === ROLE.MEMBER)),
//     status: faker.helpers.arrayElement(Object.values(PROJECT_STATUS)),
//     progress: faker.number.int({ min: 0, max: 100 }),
//   }));
//   return await Project.insertMany(projects);
// };

// const createFakeTasks = async (users: IUser[], projects: IProject[]): Promise<ITask[]> => {
//   const tasks = Array.from({ length: 10 }, () => ({
//     project: faker.helpers.arrayElement(projects.map(project => project._id)),
//     title: faker.lorem.sentence().slice(0, 20),
//     desc: faker.lorem.paragraph().slice(0, 50),
//     assignee: faker.helpers.arrayElement(users.map(user => user._id && user.role === ROLE.MEMBER)),
//     assignedTo: faker.helpers.arrayElements(
//       users.map(user => user._id && user.role === ROLE.MANAGER)
//     ),
//     priority: faker.helpers.arrayElement(Object.values(TASK_PRIORITY)),
//     status: faker.helpers.arrayElement(Object.values(TASK_STATUS)),
//     progress: faker.number.int({ min: 0, max: 100 }),
//     dueDate: faker.date.future(),
//     createdAt: faker.date.past(),
//     updatedAt: faker.date.recent(),
//     subTasks: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () => ({
//       title: faker.lorem.sentence().slice(0, 10),
//       desc: faker.lorem.paragraph().slice(0, 50),
//       priority: faker.helpers.arrayElement(Object.values(TASK_PRIORITY)),
//       status: faker.helpers.arrayElement(Object.values(TASK_STATUS)),
//       progress: faker.number.int({ min: 0, max: 100 }),
//     })),
//   }));
//   return await Task.insertMany(tasks);
// };

// async function main() {
//   try {
//     await seed();
//   } catch (error) {
//     console.error(error);
//   }
// }

// main();