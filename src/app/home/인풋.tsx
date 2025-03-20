import { Button, Flex, Padding, Spacing } from '@/@dble_layout';
import { TextField } from '@/@widgets/input/TextField';
import { useState } from 'react';
import WidgetContainer from './_WidgetContainer';

export const 인풋 = () => {
  const [이름, set이름] = useState('');
  const [연락처, set연락처] = useState('');
  return (
    <WidgetContainer title='인풋' delay={0.6} description='다양한 인풋을 통해 창의적인 폼을 빠르게 만들 수 있어요'>
      <Padding horizontal={10}>
        <Flex gap={10}>
          <TextField
            placeholder='이름을 입력해주세요'
            label='이름'
            value={이름}
            onChange={e => set이름(e.target.value)}
            onClear={() => set이름('')}
            focus={false}
          />

          <TextField
            type='tel'
            placeholder='연락처를 입력해주세요'
            label='연락처'
            value={연락처}
            onChange={e => set연락처(e.target.value)}
            onClear={() => set연락처('')}
            focus={false}
          />
        </Flex>

        <Spacing size={15} />

        <Button
          w='100%'
          disabled={!이름 || !연락처}
          onClick={() => {
            set이름('');
            set연락처('');
          }}
        >
          업로드
        </Button>
      </Padding>
    </WidgetContainer>
  );
};
