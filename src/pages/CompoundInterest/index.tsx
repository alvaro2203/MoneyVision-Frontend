import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(1000)
  const [rate, setRate] = useState(5)
  const [time, setTime] = useState(10)
  const [result, setResult] = useState(0)
  const [profit, setProfit] = useState(0)

  const calculateCompoundInterest = () => {
    const p = principal
    const r = rate / 100
    const t = time
    const amount = p * Math.pow((1 + r), t)
    const calculatedProfit = amount - p
    setResult(Number(amount.toFixed(2)))
    setProfit(Number(calculatedProfit.toFixed(2)))
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-background p-4 lg:p-8 gap-8">
      <div className="w-full lg:w-2/5 max-w-xl lg:max-w-none lg:-mt-16">
        <div className="bg-primary/10 backdrop-blur-sm rounded-lg p-6 lg:p-8 shadow-lg ">
          <h1 className="text-3xl font-bold text-primary mb-4">El Poder del Interés Compuesto</h1>
          <p className="text-lg text-foreground mb-6">
            El interés compuesto es una herramienta financiera poderosa que puede trabajar a tu favor o en tu contra. 
            En inversiones, multiplica tus ganancias con el tiempo. En deudas, puede aumentar significativamente lo que debes. 
            Comprender y utilizar el interés compuesto es clave para tomar decisiones financieras inteligentes y alcanzar tus metas económicas.
          </p>
          <blockquote className="border-l-4 border-primary pl-4 italic text-lg text-foreground">
            "El interés compuesto es la octava maravilla del mundo. Quien lo entiende, lo gana; quien no, lo paga."
            <footer className="text-sm mt-2 text-right">— Warren Buffett</footer>
          </blockquote>
        </div>
      </div>
      <Card className="w-full lg:w-1/2 max-w-md lg:mt-16 lg:ml-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Calculadora de Interés Compuesto</CardTitle>
          <CardDescription>Ingresa los datos para calcular el interés compuesto.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="principal">Capital inicial (€)</Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Tasa de interés anual (%)</Label>
            <Input
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full"
              step="0.01"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Número de años</Label>
            <Input
              id="time"
              type="number"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-full"
              min="1"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <Button onClick={calculateCompoundInterest} className="w-full">
            Calcular
          </Button>
          {result > 0 && (
            <div className="text-center space-y-2">
              <div>
                <p className="text-lg font-semibold text-primary">Monto final:</p>
                <p className="text-2xl font-bold text-primary">
                  {result.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold text-primary">
                  {profit >= 0 ? 'Ganancias:' : 'Pérdidas:'}
                </p>
                <p className={`text-2xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(profit).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {rate >= 0 
                  ? `Crecimiento total: ${((profit / principal) * 100).toFixed(2)}%`
                  : `Decrecimiento total: ${((profit / principal) * 100).toFixed(2)}%`
                }
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}