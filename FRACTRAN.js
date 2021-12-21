

function FRACTRAN(program, input) {
    let x = BigInt(input)
    let halted = false
    let i = 0
    let rule = ''

    const fractions = program
        .split(' ')
        .map((f) => f.split('/').map((a) => BigInt(a)))
    
    
    const step = () => {
        for (const f in fractions) {
            const [n, d] = fractions[f]
            if (x % d !== 0n) continue
            x /= d
            x *= n
            i += 1
            rule = f
            return true
        }
        halted = true
        return false
    }

    const status = () => {
        return {
            i,
            x,
            halted,
            rule,
        }
    }

    return {
        step,
        status,
    }
}