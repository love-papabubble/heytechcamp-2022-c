import { MenuItem, Select, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BrowserQRCodeReader } from '@zxing/browser';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

type CameraDeviceInfo = {
  id: string;
  name: string;
};

const QrCodeReader: NextPage = () => {
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mountedRef = useRef<boolean>(false);
  const [devices, setDevices] = useState<CameraDeviceInfo[]>([]);
  const [currentCamera, setCurrentCamera] = useState<string | undefined>(
    undefined
  );

  const setDevicesList = async (): Promise<CameraDeviceInfo[]> => {
    const list = await BrowserQRCodeReader.listVideoInputDevices();
    const result: CameraDeviceInfo[] = [];
    for (const device of list) {
      result.push({ id: device.deviceId, name: device.label });
    }
    setDevices([...result]);
    return result;
  };

  useEffect(() => {
    mountedRef.current = true;
    const codeReader = new BrowserQRCodeReader(undefined, undefined);
    setDevicesList();
    codeReader.decodeFromVideoDevice(
      currentCamera,
      videoRef.current!,
      function (result, _, controls) {
        if (!mountedRef.current) {
          controls.stop();
          return;
        }
        if (typeof result !== 'undefined') {
          controls.stop();
          window.location.href = result.getText();
        }
      }
    );
    return function cleanup() {
      mountedRef.current = false;
    };
  }, [currentCamera]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <Typography
        variant='h6'
        style={{ marginBottom: '1em', width: '90%', maxWidth: '1000px' }}
        fontWeight='bold'
        align='center'>
        QRコードを読み込んでください
      </Typography>
      {devices.length !== 0 && (
        <Select
          value={currentCamera === undefined ? devices[0]?.id : currentCamera}
          onChange={(e: {
            target: { value: React.SetStateAction<string | undefined> };
          }) => {
            setCurrentCamera(e.target.value);
          }}
          style={{ width: '90%', maxWidth: '1000px' }}>
          {devices.map((device, index) => (
            <MenuItem value={device.id} key={index.toString()}>
              {device.name}
            </MenuItem>
          ))}
        </Select>
      )}

      <video
        style={{
          width: '90%',
          maxWidth: '1000px',
          borderRadius: '10px',
          marginTop: '1em',
          marginBottom: '1em',
        }}
        ref={videoRef}
      />
      <Link href={'/users/orders'} passHref>
        QRリーダーを終了する
      </Link>
    </div>
  );
};
export default QrCodeReader;
