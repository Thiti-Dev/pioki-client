import { workBench } from "@/utils/font";

export default function StatisticSection(){
    return <>
        <div className={`${workBench.className} rounded-2xl bg-gray-900 py-24 sm:py-32`}>
  <div className="mx-auto lg:w-[60vw] px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:max-w-none">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">`Not hopping in today will get you regretted`</h2>
        <p className="text-lg leading-8 text-gray-300">
            Every story from you matters, so we are here to extenderize the extent of it
        </p>
      </div>
      <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Registered users</dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-white">+1</dd>
        </div>
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Stories shared</dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-white">10k</dd>
        </div>
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Stories kept</dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-white">6k</dd>
        </div>
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Stories passed along</dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-white">374</dd>
        </div>
      </dl>
    </div>
  </div>
</div>
    </>
}