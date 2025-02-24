import React from 'react'
import QuestionBank from '../layout/roles/teacher/QuestionBank'
import CreateQuiz from '../layout/roles/teacher/CreateQuiz'
import Divider from '../layout/Divider'
import ClassQuestions from '../layout/roles/teacher/ClassQuestions'
import { QCard } from '../layout/roles/teacher/QCard'
import { QuestionCard } from '../layout/roles/teacher/QuestionCard'

const ComponentPage = () => {
    return (
        <div>
            <>
                <QuestionBank />
                <Divider />
                <CreateQuiz />
                <Divider />
                <ClassQuestions />
                <Divider />
                <QCard question={{ question: "something here", topic: "Gravitation" }} index={0} isSelected={false} onSelect={() => { }}
                    onPreview={() => { }} onDelete={function (id: string, type: 'mcq' | 'fill' | 'tf' | 'formula'): Promise<void> {
                        throw new Error('Function not implemented.')
                    }} />
                <Divider />
                <QuestionCard question={{ question: "something here", topic: "Gravitation" }} isSelected={false} onSelect={function (): void {
                    throw new Error('Function not implemented.')
                }} onPreview={function (): void {
                    throw new Error('Function not implemented.')
                }} number={0} />
                <Divider />
            </>

        </div>
    )
}

export default ComponentPage