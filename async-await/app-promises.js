const users = [{
            id: 1,
            name: 'Jon',
            schoolId: 10
        }, {
            id: 2,
            name: 'Steve',
            schoolId: 20
        }, {
            id: 3,
            name: 'Amo',
            schoolId: 30
        }];

        const grades = [{
            id: 1,
            schoolId: 10,
            grade: 5
        }, {
            id: 2,
            schoolId: 20,
            grade: 15
        }, {
            id: 3,
            schoolId: 10,
            grade: 7
        }];

        const getUser = (id) => {
            return new Promise((res, rej) => {
                const user = users.find((user) => user.id === id);

                if (user) {
                    res(user);
                } else {
                    rej(`Unable too find user with id ${id}`);
                }
            });
        };

        const getGrades = (schoolId) => {
            return new Promise((res, rej) => {
                res(grades.filter((grade) => grade.schoolId === schoolId));
            });
        };

        const getStaus = (userId) => {
            let user;
            return getUser(userId).then((tempUser) => {
                user = tempUser;                
                return getGrades(user.schoolId);
            }).then((grades) => {
                let average = 0;

                if (grades.length > 0) {
                    average = grades.map((grade) => grade.grade).reduce((a , b) => a + b);
                }
                return `${user.name} has a average grade of ${average}`;
            });
        };

        const getasyncAwaitStaus = async (userId) => {
            const user = await getUser(userId);
            const grades = await getGrades(user.schoolId);
            let average = 0;

            if (grades.length > 0) {
                average = grades.map((grade) => grade.grade).reduce((a , b) => a + b);
            }
            return `${user.name} has a average grade of ${average}`;
        };

        getasyncAwaitStaus(1).then((status) => {
           console.log(status);
        }).catch((e) => {
            console.log(e);
        });
        
        // getStaus(1).then((status) => {
        //     console.log(status);
        // }).catch((e) => {
        //     console.log(e);
        // })


        // getUser(2).then((user) => {
        //     console.log('found user', user);
        // }).catch((e) => {
        //     console.log(e);
        // })

        // getGrades(10).then((grade) => {
        //     console.log('found grades', grade);
        // }).catch((e) => {
        //     console.log(e);
        // })

        