const API_BASE = 'http://localhost:5000/api';
let walletAddress = null;

document.getElementById('connect-wallet').addEventListener('click', async () => {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            walletAddress = response.publicKey.toString();
            document.getElementById('wallet-address').innerText = `Connected: ${walletAddress}`;
        } catch (err) {
            alert('Wallet connection failed');
        }
    } else {
        alert('Phantom Wallet not found.');
    }
});

document.getElementById('start-stream').addEventListener('click', async () => {
    const res = await fetch(`${API_BASE}/start`, { method: 'POST' });
    const data = await res.json();
    alert(data.status);
    document.getElementById('start-stream').disabled = true;
    document.getElementById('stop-stream').disabled = false;
});

document.getElementById('stop-stream').addEventListener('click', async () => {
    const res = await fetch(`${API_BASE}/stop`, { method: 'POST' });
    const data = await res.json();
    alert(data.status);
    document.getElementById('start-stream').disabled = false;
    document.getElementById('stop-stream').disabled = true;
});

document.getElementById('start-recording').addEventListener('click', async () => {
    await fetch(`${API_BASE}/record`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ action: 'start' })
    });
    document.getElementById('start-recording').disabled = true;
    document.getElementById('stop-recording').disabled = false;
});

document.getElementById('stop-recording').addEventListener('click', async () => {
    await fetch(`${API_BASE}/record`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ action: 'stop' })
    });
    document.getElementById('start-recording').disabled = false;
    document.getElementById('stop-recording').disabled = true;
});

document.getElementById('playback-recording').addEventListener('click', async () => {
    await fetch(`${API_BASE}/playback`);
    alert('Playback started');
});

document.getElementById('send-token').addEventListener('click', async () => {
    const token = document.getElementById('token-select').value;
    if (!walletAddress || !token) return alert('Wallet or token not selected.');
    alert(`Simulating token send of ${token}`);
});

document.getElementById('complete-quest').addEventListener('click', async () => {
    document.getElementById('quest-result').innerText = "Quest Completed! Token Reward Sent.";
});

window.onload = () => {
    const nftHTML = '<img src="https://via.placeholder.com/100" alt="NFT"><p>Sample NFT #001</p>';
    document.getElementById('nft-container').innerHTML = nftHTML;
};
