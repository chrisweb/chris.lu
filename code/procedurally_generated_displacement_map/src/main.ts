import { createNoise2D } from 'simplex-noise'

const convertRange = (value: number, r1: [number, number], r2: [number, number]) => {
    // https://stackoverflow.com/a/14224813/656689
    return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0]
}

const inRange = (value: number, range: [number, number]) => value >= range[0] && value <= range[1]

const draw = () => {

    const width = 32
    const height = 64

    const noise2D = createNoise2D()

    const canvas = document.getElementById('displacement_map') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')

    let count = 0

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            // returns a value between -1 and 1
            const value2d = noise2D(x, y)
            //console.log(value2d)
            // to convert "-1 to 1" range to "0 to 1" range do (x + 1) / 2
            // to convert "0 to 1" range to "0 to 255" range, multiply by 255 
            let rgbColor = ((value2d + 1) / 2) * 255

            // close to the road limit the possible height of the mountains
            if (inRange(x, [8, 10]) || inRange(x, [22, 24])) {
                rgbColor = convertRange(rgbColor, [0, 255], [0, 100])
            }

            // the road itself is pure black
            if (inRange(x, [10, 22])) {
                rgbColor = 0
            }

            //console.log(rgbColor)

            if (ctx !== null) {
                // grayscale
                ctx.fillStyle = `rgb(${rgbColor}, ${rgbColor}, ${rgbColor})`

                ctx.fillRect(x, y, 1, 1)
            }
            count++
        }
    }

    console.log(width+'*'+height+'='+count)

    /*setTimeout(() => {
        requestAnimationFrame(draw)
    }, 200)*/

}

draw()