import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InstrumentUsageChart } from "@/components/instrument-usage-chart"
import { PopularTuningsChart } from "@/components/popular-tunings-chart"

export const metadata: Metadata = {
  title: "Analytics Dashboard | Working Tuner",
  description:
    "View analytics about instrument usage and popular tunings for Working Tuner.",
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-zinc-900">
      <div className="max-w-6xl w-full py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-zinc-100">Working Tuner Analytics</h1>
          <p className="text-center text-zinc-400 mt-2">
            Insights about instrument usage and popular tunings
          </p>
        </header>

        <section className="mb-8 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/">Return to Tuner</Link>
          </Button>
        </section>

        <section className="space-y-4">
          <Tabs defaultValue="instruments" className="space-y-4">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="instruments">Instruments</TabsTrigger>
              <TabsTrigger value="tunings">Tunings</TabsTrigger>
            </TabsList>
            <TabsContent value="instruments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Instrument Usage</CardTitle>
                  <CardDescription>
                    The most popular instruments used with Working Tuner
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <InstrumentUsageChart />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tunings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Tunings</CardTitle>
                  <CardDescription>
                    The most frequently used tunings across all instruments
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <PopularTuningsChart />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>
      
      <footer className="mt-12 pt-6 border-t border-zinc-800 w-full">
        <p className="text-center text-zinc-500 text-sm">
          © {new Date().getFullYear()} SpudPug Development. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
