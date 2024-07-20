import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/accordian';

const SpotisyncAccordian = () => {
  return (
    <div>
          <div className='flex px-4 justify-center items-center text-center text-amber-500 mb-10 text-2xl py-0 sm:py-4'>
            <p>Frequently Asked Questions (FAQs)</p>
          </div>
          <div className='mx-4 px-4 my-6 bg-neutral-900'>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>What is SpotiSync?</AccordionTrigger>
                <AccordionContent>SpotiSync converts your Spotify playlists to YouTube with one click.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I use SpotiSync?</AccordionTrigger>
                <AccordionContent>Sign in with your Spotify account, select a playlist, and sync it to your YouTube account.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I sync private Spotify playlists?</AccordionTrigger>
                <AccordionContent>Yes, SpotiSync can access and sync private playlists.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I choose specific songs from a playlist to sync?</AccordionTrigger>
                <AccordionContent>Yes, you can select custom songs before syncing.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Current limitation</AccordionTrigger>
                <AccordionContent>Youtube only provides limited tokens for conversion per day. Therefore theres a limitaion on how much songs you can convert</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
  )
}

export default SpotisyncAccordian