import React, { useEffect, useState } from "react";

const LocalIPDiscovery = () => {
    const [localIP, setLocalIP] = useState("");

    // useEffect(() => {
    //     async function findLocalIP() {
    //         window.RTCPeerConnection =
    //             window.RTCPeerConnection ||
    //             window.mozRTCPeerConnection ||
    //             window.webkitRTCPeerConnection;

    //         if (window.RTCPeerConnection) {
    //             const pc = new RTCPeerConnection({ iceServers: [] });
    //             pc.createDataChannel("");
    //             pc.createOffer().then((offer) => pc.setLocalDescription(offer));
    //             pc.onicecandidate = (ice) => {
    //                 if (!ice || !ice.candidate || !ice.candidate.candidate) return;
    //                 const myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(ice.candidate.candidate)[1];
    //                 setLocalIP(myIP);
    //                 pc.close();
    //             };
    //         }
    //     }

    //     findLocalIP();
    // }, []);

    useEffect(() => {
        async function findLocalIP() {
            window.RTCPeerConnection =
                window.RTCPeerConnection ||
                window.mozRTCPeerConnection ||
                window.webkitRTCPeerConnection;

            if (window.RTCPeerConnection) {
                const pc = new RTCPeerConnection({ iceServers: [] });
                pc.createDataChannel("");
                pc.createOffer().then((offer) => pc.setLocalDescription(offer));
                pc.onicecandidate = ice => {
                    console.log('ICE Candidate:', ice.candidate.candidate);
                    if (!ice || !ice.candidate || !ice.candidate.candidate) return;
                    const match = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(ice.candidate.candidate);
                    console.log('Match:', match);
                    if (match) {
                      const myIP = match[1];
                      setLocalIP(myIP);
                      pc.close();
                    }
                  };
            }
        }

        findLocalIP();
    }, []);

    return <div>Your Local IP: {localIP}</div>;
};

export default LocalIPDiscovery;
