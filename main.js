const examples = [
    {
        title: 'A + B',
        input: '108',
        program: '#input = 2^a * 3^b\n#output = 5^(a+b)\n\n5/2 5/3',
    }, {
        title: '|A - B|',
        input: '108',
        program: '#input = 2^a * 3^b\n#output = 5^|a-b|\n\n1/6 5/2 5/3',
    }, {
        title: 'A * B',
        input: '216',
        program: '#input = 2^a * 3^b\n#output = 5^(a*b)\n\n231/539 1/77 245/21 77/7 7/2 1/3',
    }
]

const initialSelected = 2

const run = () => {
    reset()

    const input = document.getElementById('input').value
    const program = document.getElementById('program').value

    const parsedProgram = parseProgram(program)

    const machine = new FRACTRAN(parsedProgram, input)

    let status = machine.status()
    addToLog(status)
    updateStatus(status)
    loop(machine)()
}

const loop = (machine) => {
    return () => {
        machine.step()
        const status = machine.status()
        addToLog(status)
        updateStatus(status)

        if (!status.halted) {
            setTimeout(loop(machine), 10)
        }
    }
}


const changeExample = (exampleId) => {
    exampleId = exampleId || parseInt(document.querySelector('#examples').value)
    const example = examples[exampleId]

    document.getElementById('input').value = example.input
    document.getElementById('program').value = example.program
}
const startup = () => {
    // Setup examples dropdown
    document.querySelector('#examples').innerHTML = examples.map((example, i) => {
        return `
            <option value="${i}" ${i == initialSelected ? 'selected' : ''}>${example.title}</option>
        `
    })

    changeExample(initialSelected)
}

const reset = () => {
    clearLog()
    clearStatus()
}

// Function to parse program from raw format, removes comments.
const parseProgram = (program) => {
    return program
        .replace(/#.*\n/g, '') // remove comments
        .replace(/\n/g, ' ')   // remove new lines
        .replace(/  +/g, ' ')  // remove multiple spaces
        .trim()                // trim front and back for whitespace
}


// Clear the log table entries
const clearLog = () => {
    document.querySelector('.log .table tbody').innerHTML = ''
}

// Add a new row to log table
const addToLog = ({i, x, halted, rule}) => {
    const html = `
        <tr>
            <td>${i}</td>
            <td>${x}</td>
            <td>${rule}</td>
            <td>${halted}</td>
        </tr>
    `

    document.querySelector('.log .table tbody').innerHTML += html
}

const clearStatus = () => {
    updateStatus({i: '', x: '', halted: '', rule: ''})
}

const updateStatus = ({i, x, halted, rule}) => {
    document.getElementById('data-i').innerHTML = i
    document.getElementById('data-x').innerHTML = x
    document.getElementById('data-halted').innerHTML = halted
    document.getElementById('data-rule').innerHTML = rule
}

window.onload = startup
