import Container from '../../components/Container'

export default function DashboardGestor() {
    return (
        <div className="p-6 space-y-4 flex gap-2">
            <section>
                <Container>
                    <h2 className='font-semibold'>Quests da equipe</h2>
                    <div>
                        <h1>temos que fazer o tudo list</h1>
                    </div>
                </Container>
            </section>

            <section className='grid grid-flow-col grid-rows-4'>
                <Container>
                    01
                </Container>
                <Container>
                    02
                </Container>
                <Container>

                </Container>
            </section>
        </div>
    )
}