import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { Cycles } from '../Cycles';
import { PlayCircleIcon } from 'lucide-react';

export function MainForm() {
    return <>
        <form className='form' action=''>
        <div className='formRow'>
            <DefaultInput
                type='text'
                id='task'
                labelText='Task'
                placeholder='Digite algo...'
            />
        </div>

        <div className='formRow'>
            <p> Lorem ipsum dolor sit amet. </p>
        </div>

        <div className='formRow'>
            <Cycles />
        </div>

        <div className='formRow'>
            <DefaultButton icon={<PlayCircleIcon />} />
        </div>
    </form>
    </>
}