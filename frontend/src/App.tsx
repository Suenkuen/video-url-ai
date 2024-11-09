import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function App() {
    const [url, setUrl] = useState('');
    const [loadingMessage, setLoadingMessage] = useState('');
    const [samples, setSamples] = useState<string[]>([]);
    const [activeSampleIndex, setActiveSampleIndex] = useState<null | number>(null);

    useEffect(() => {
        if (!samples.length) {
            axios.get('http://localhost:8080/samples')
                .then(response => {
                    setSamples(response.data);
                });
        }
    }, []);

    useEffect(() => {
        if (samples.length) {
            randomSample();
            setInterval(() => {
                randomSample();
                console.log('random now');
            }, 3000);
        }
    }, [samples]);

    function randomSample() {
        const random = randomIntFromInterval(0, samples.length - 1);
        console.log(random);
        setActiveSampleIndex(random);
    }

    async function handleSubmit(ev: FormEvent) {
        ev.preventDefault();
        setLoadingMessage('Generating assets...');
        const assetsResponse = await axios.get(
            'http://localhost:8080/create-story?url=' + encodeURIComponent(url)
        );
        const id = await assetsResponse.data;
        setLoadingMessage('Preparing your video...');
        const videoResponse = await axios.get('http://localhost:8080/build-video?id=' + id);
        setLoadingMessage('');
        window.location.href = 'http://localhost:8080/' + videoResponse.data;
    }

    return (
        <>
            {loadingMessage && (
                <div className="fixed inset-0 z-20 bg-gray-800/90 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mr-4"></div>
                    <p className="text-4xl text-center text-white">
                        {loadingMessage}
                    </p>
                </div>
            )}
            <main className="max-w-2xl mx-auto flex gap-16 px-4">
                <div className="py-8 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold uppercase mb-4">
                        <span className="text-5xl animate-pulse text-blue-400">
                            URL to Video
                        </span>
                        <br />
                        <span className="bg-gradient-to-br from-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
                            AI-Powered
                        </span>
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="grid gap-2">
                        <input
                            className="border-2 rounded-full bg-transparent text-white px-4 py-2 grow shadow-lg hover:shadow-blue-400 focus:outline-none focus:border-blue-400 transition duration-300"
                            value={url}
                            onChange={ev => setUrl(ev.target.value)}
                            type="url"
                            placeholder="https://..."
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-full uppercase hover:bg-blue-600 active:scale-95 transition duration-200 shadow-lg"
                            type="submit">
                            Create&nbsp;video
                        </button>
                    </form>
                </div>
                <div className="py-4">
                    <div className="text-gray-500 w-[240px] h-[380px] relative">
                        {samples?.length > 0 && samples.map((sample, samplesKey) => (
                            <video
                                key={samplesKey}
                                playsInline={true}
                                muted={true}
                                controls={false}
                                loop={true}
                                autoPlay={true}
                                className="shadow-4xl shadow-purple-400 rounded-2xl overflow-hidden absolute top-2 transition-opacity duration-500"
                                style={{
                                    opacity: samplesKey === activeSampleIndex ? '1' : '0',
                                    transform: samplesKey === activeSampleIndex ? 'scale(1.05)' : 'scale(1)'
                                }}
                                src={'http://localhost:8080/' + sample + '/final.mp4'}></video>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default App;