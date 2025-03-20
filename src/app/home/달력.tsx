import { Flex, Padding } from '@/@dble_layout';
import Calendar from '@/@widgets/calendar/Calendar';
import { useMoment } from '@/libs/hooks';
import { scrollToNextRef } from '@/libs/utils/scrollToRef';
import { useRef, useState } from 'react';
import WidgetContainer from './_WidgetContainer';

export const 달력 = () => {
  const [date, setDate] = useState<Date>(new Date());
  const ref = useRef<HTMLDivElement>(null);

  return (
    <WidgetContainer
      ref={ref}
      title='캘린더'
      delay={0.2}
      description={`Dble Calendar로 일정 관리 기능을 경험해보세요!\n현재 : ${useMoment(date).format('yyyy년mm월dd일')}`}
    >
      <Flex align='center'>
        <Padding maxW={360} vertical={10}>
          <Calendar
            date={date}
            onClick={data => {
              setDate(data);
              scrollToNextRef(ref);
            }}
          />
        </Padding>
      </Flex>
    </WidgetContainer>
  );
};
