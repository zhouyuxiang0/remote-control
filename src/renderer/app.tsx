import { ipcRenderer, IpcRendererEvent } from 'electron'
import { useEffect, useState } from 'react'

export default function App() {
    const [remoteCode, setRemoteCode] = useState('')
    const [localCode, setLocalCode] = useState('')
    const [controlText, setControlText] = useState('')
    const login = async () => {
        let code = await ipcRenderer.invoke('login')
        setLocalCode(code)
    }
    useEffect(() => {
        login()
        ipcRenderer.on('control-state-change', handleControlState)
        return () => {
            ipcRenderer.removeListener(
                'control-state-change',
                handleControlState
            )
        }
    }, [])
    const startControl = (remoteCode: string) => {
        ipcRenderer.send('control', remoteCode)
    }
    const handleControlState = (
        e: IpcRendererEvent,
        name: string,
        type: number
    ) => {
        let text = ''
        if (type === 1) {
            text = `正在远程控制${name}`
        } else if (type === 2) {
            text = `被${name}控制中`
        }
    }
    return (
        <div>
            {controlText === '' ? (
                <>
                    <div>你的控制码{localCode}</div>
                    <input
                        type="text"
                        value={remoteCode}
                        onChange={(e) => setRemoteCode(e.target.value)}
                    />
                    <button onClick={() => startControl(remoteCode)}>
                        确认
                    </button>
                </>
            ) : (
                <div>{controlText}</div>
            )}
        </div>
    )
}
