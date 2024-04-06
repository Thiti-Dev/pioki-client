import { getGeneralStatisticDataServerAction } from "@/actions/statistics";
import GenericError from "@/components/common/generic-error";
import { GeneralStatisticData } from "@/shared/interfaces/statistic.interface";
import { workBench } from "@/utils/font";
import { MutableRefObject, useEffect, useRef, useState } from "react";

import CountUp, { useCountUp } from 'react-countup';

// type GeneralStatisticDataWithString = {
//   [K in keyof GeneralStatisticData]: number | string;
// };

type Props = {
  inView: boolean
}
type FirstArgType<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : never; // extract the first argument from function

export default function StatisticSection(props: Props){
  function createCountUpProps(ref:MutableRefObject<null>,prefix?: string){
    return {
      ref,
      start: 0,
      end: 0, // update() later
      delay: 1000,
      prefix,
      duration: 10,
      startOnMount:true
    } as FirstArgType<typeof useCountUp>
  }

  const [statisticData, setStatisticData] = useState<GeneralStatisticData>({
    total_created_post: 0,
    total_post_kept: 0,
    total_post_passed_along: 0,
    total_user: 0
  })
    const userCountUpRef = useRef(null);
    const storyCreatedCountUpRef = useRef(null);
    const storyKeptCountUpRef = useRef(null);
    const storyPassedCountUpRef = useRef(null);
    const {reset: resetUserCount, update: updateUserCount } = useCountUp(createCountUpProps(userCountUpRef,"+"))
    const {reset: resetStoryCreatedCount, update: updateStoryCreatedCount } = useCountUp(createCountUpProps(storyCreatedCountUpRef,"+"))
    const {reset: resetStoryKeptCount, update: updateStoryKeptCount } = useCountUp(createCountUpProps(storyKeptCountUpRef,"+"))
    const {reset: resetStoryPassedCount, update: updateStoryPassedCount } = useCountUp(createCountUpProps(storyPassedCountUpRef,"+"))
    useEffect(() => {
      (async() => {
        const res = await getGeneralStatisticDataServerAction()
        if(!res.ok) return
        setStatisticData(res.data)
        const {total_user,total_created_post,total_post_kept,total_post_passed_along} = res.data
        updateUserCount(total_user)
        updateStoryCreatedCount(total_created_post)
        updateStoryKeptCount(total_post_kept)
        updateStoryPassedCount(total_post_passed_along)
      })()
    },[])

    useEffect(() => {
      if(!props.inView){
        resetUserCount()
        resetStoryCreatedCount()
        resetStoryKeptCount()
        resetStoryPassedCount()
        return
      }
      // reset all count up
      // To properly start animating when this slided into view
      updateUserCount(statisticData.total_user)
      updateStoryCreatedCount(statisticData.total_created_post)
      updateStoryKeptCount(statisticData.total_post_kept)
      updateStoryPassedCount(statisticData.total_post_passed_along)
    }, [props.inView])

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
          <dd className="order-first text-3xl font-semibold tracking-tight text-white"><div ref={userCountUpRef}/></dd>
        </div>
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Stories created</dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-white"><div ref={storyCreatedCountUpRef}/></dd>
        </div>
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Stories kept</dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-white"><div ref={storyKeptCountUpRef}/></dd>
        </div>
        <div className="flex flex-col bg-white/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Stories passed along</dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-white"><div ref={storyPassedCountUpRef}/></dd>
        </div>
      </dl>
    </div>
  </div>
</div>
    </>
}