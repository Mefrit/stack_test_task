"use strict";
class TestRunner {
    constructor(name) {
        this.name = name
        this.testNo = 1
    }

    expectTrue(cond) {
        try {
            if (cond()) {
                this._pass()
            } else {
                this._fail()
            }
        } catch (e) {
            this._fail(e)
        }
    }

    expectFalse(cond) {
        this.expectTrue(() => !cond())
    }

    expectException(block) {
        try {
            block()
            this._fail()
        } catch (e) {
            this._pass()
        }
    }

    _fail(e = undefined) {
        console.log(`FAILED: Test #${this.testNo++} of ${this.name}`)
        if (e != undefined) {
            console.log(e)
        }
    }

    _pass() {
        console.log(`PASSED: Test #${this.testNo++} of ${this.name}`)
    }
}

function match({ string, pattern }) {
    // ------------------------------------------------------------------------------------------------
    // Решение задачи 1
    // ------------------------------------------------------------------------------------------------
    var { string, pattern } = { string, pattern };
    if (string.length != pattern.length) {
        return false;
    }
    var result = true, patterns_availabele_symbols = ["a", "*", "d", " "];
    string = string.split("");
    pattern = pattern.split("");
    for (var index = 0; index < string.length; index++) {

        if (patterns_availabele_symbols.indexOf(pattern[index]) == -1) {
            throw new Error();
        }
        if (string[index] == " ") {
            if (pattern[index] != " ") {
                result = false;
            }
        } else {

            if (isNaN(parseInt(string[index]))) {
                if (pattern[index] != "a" && pattern[index] != "*") {
                    result = false;
                }
            } else {
                if (pattern[index] != "d" && pattern[index] != "*") {
                    result = false;
                }
            }
        }
    }
    return result;

}

function testMatch() {
    const runner = new TestRunner('match')

    runner.expectFalse(() => match({ string: 'xy', pattern: 'a' }))
    runner.expectFalse(() => match({ string: 'x', pattern: 'd' }))
    runner.expectFalse(() => match({ string: '0', pattern: 'a' }))
    runner.expectFalse(() => match({ string: '*', pattern: ' ' }))
    runner.expectFalse(() => match({ string: ' ', pattern: 'a' }))

    runner.expectTrue(() => match({ string: '01 xy', pattern: 'dd aa' }))
    runner.expectTrue(() => match({ string: '1x', pattern: '**' }))

    runner.expectException(() => match({ string: 'x', pattern: 'w' }))
}

const tasks = {
    id: 0,
    name: 'Все задачи',
    children: [
        {
            id: 1,
            name: 'Разработка',
            children: [
                { id: 2, name: 'Планирование разработок', priority: 1 },
                { id: 3, name: 'Подготовка релиза', priority: 4 },
                { id: 4, name: 'Оптимизация', priority: 2 },
            ],
        },
        {
            id: 5,
            name: 'Тестирование',
            children: [
                {
                    id: 6,
                    name: 'Ручное тестирование',
                    children: [
                        { id: 7, name: 'Составление тест-планов', priority: 3 },
                        { id: 8, name: 'Выполнение тестов', priority: 6 },
                    ],
                },
                {
                    id: 9,
                    name: 'Автоматическое тестирование',
                    children: [
                        { id: 10, name: 'Составление тест-планов', priority: 3 },
                        { id: 11, name: 'Написание тестов', priority: 3 },
                    ],
                },
            ],
        },
        { id: 12, name: 'Аналитика', children: [] },
    ],
}

function getChildren(tasks, groupId, curent_group, cache_data, empty_group) {
    var local_curent_group = false;
    tasks.children.forEach(elem => {
        if (!!!elem.priority) {
            if (elem.id == groupId) {
                local_curent_group = true;
            } else {
                if (!curent_group) {
                    local_curent_group = false;
                } else {
                    local_curent_group = true;
                }
            }
            var answer = getChildren(elem, groupId, local_curent_group, cache_data, empty_group);
            empty_group = answer.empty_group;
            cache_data.concat(answer.cache_data);
        } else {
            if (curent_group) {
                cache_data.push(elem);
            }
        }
    });
    if (tasks.children.length == 0 && curent_group && cache_data.length == 0) {
        empty_group = true;
    }

    return { cache_data: cache_data, curent_group: curent_group, empty_group: empty_group };
}
function findTaskHavingMaxPriorityInGroup({ tasks, groupId }) {
    // ------------------------------------------------------------------------------------------------
    // Решение задачи 2
    // ------------------------------------------------------------------------------------------------
    var { tasks, groupId } = { tasks, groupId }, max_task = { priority: -1 };
    var answer = getChildren({ children: [tasks] }, groupId, false, [], false);
    if (answer.empty_group) {
        return undefined;
    }
    answer.cache_data.forEach(elem => {
        if (elem.priority > max_task.priority) {
            max_task = elem;
        }
    });
    if (max_task.priority == -1) {
        throw new Error();

    }
    return max_task;

}

function taskEquals(a, b) {
    return (
        a.children == undefined &&
        b.children == undefined &&
        a.id == b.id &&
        a.name == b.name &&
        a.priority == b.priority
    )
}

function testFindTaskHavingMaxPriorityInGroup() {
    const runner = new TestRunner('findTaskHavingMaxPriorityInGroup');
    runner.expectException(() => findTaskHavingMaxPriorityInGroup({ tasks, groupId: 13 }))
    runner.expectException(() => findTaskHavingMaxPriorityInGroup({ tasks, groupId: 2 }))

    runner.expectTrue(() => findTaskHavingMaxPriorityInGroup({ tasks, groupId: 12 }) == undefined)

    runner.expectTrue(() =>
        taskEquals(findTaskHavingMaxPriorityInGroup({ tasks, groupId: 0 }), {
            id: 8,
            name: 'Выполнение тестов',
            priority: 6,
        }),
    )
    runner.expectTrue(() =>
        taskEquals(findTaskHavingMaxPriorityInGroup({ tasks, groupId: 1 }), {
            id: 3,
            name: 'Подготовка релиза',
            priority: 4,
        }),
    )

    runner.expectTrue(() => findTaskHavingMaxPriorityInGroup({ tasks, groupId: 9 }).priority == 3)
}

testMatch();
testFindTaskHavingMaxPriorityInGroup();