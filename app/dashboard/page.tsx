import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Analytics Dashboard | Poly Tuner",
  description: "Usage analytics for the Poly Tuner application",
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-4 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100">Analytics Dashboard</h1>
            <p className="text-zinc-400">View usage statistics for Poly Tuner</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">Back to Tuner</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,845</div>
              <p className="text-xs text-zinc-500">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tuning Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7,392</div>
              <p className="text-xs text-zinc-500">+24% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Microphone Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">63%</div>
              <p className="text-xs text-zinc-500">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="instruments">
          <TabsList className="mb-4">
            <TabsTrigger value="instruments">Instruments</TabsTrigger>
            <TabsTrigger value="tunings">Tunings</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="instruments">
            <Card>
              <CardHeader>
                <CardTitle>Instrument Usage</CardTitle>
                <CardDescription>Distribution of instrument selections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="space-y-4 w-full max-w-md">
                    <div className="flex items-center">
                      <div className="w-16 text-xs">Guitar</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "68%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">68%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-16 text-xs">Bass</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "14%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">14%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-16 text-xs">Ukulele</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "11%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">11%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-16 text-xs">Banjo</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "4%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">4%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-16 text-xs">Mandolin</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "3%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">3%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tunings">
            <Card>
              <CardHeader>
                <CardTitle>Popular Tunings</CardTitle>
                <CardDescription>Most frequently used tunings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="space-y-4 w-full max-w-md">
                    <div className="flex items-center">
                      <div className="w-28 text-xs">Standard</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "42%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">42%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-28 text-xs">Drop D</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "18%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">18%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-28 text-xs">Half Step Down</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "15%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">15%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-28 text-xs">Full Step Down</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "12%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">12%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-28 text-xs">Open G</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "8%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">8%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-28 text-xs">Other</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "5%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">5%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Feature Usage</CardTitle>
                <CardDescription>Most used features of the tuner</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="space-y-4 w-full max-w-md">
                    <div className="flex items-center">
                      <div className="w-28 text-xs">Reference Tones</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "87%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">87%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-28 text-xs">Microphone</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "63%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">63%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-28 text-xs">Chromatic Mode</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "42%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">42%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-28 text-xs">432Hz Reference</div>
                      <div className="flex-1 bg-zinc-800 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "18%" }}></div>
                      </div>
                      <div className="w-10 text-xs text-right">18%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-xs text-zinc-500 text-center">
          <p>
            This dashboard shows simulated data for demonstration purposes. Actual analytics are collected anonymously
            and used only to improve the application.
          </p>
        </div>
      </div>
    </main>
  )
}
