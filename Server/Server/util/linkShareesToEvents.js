export function linkShareesToEvents(events, sharees) {
    const linked = {};
    
    for (const sharee of sharees) {
        if (!linked[sharee.EventID])
            linked[sharee.EventID] = [];
        linked[sharee.EventID].push(sharee);
    }

    for (let i = 0; i < events.length; i++) {
        events[i].Sharees = linked[events[i].EventID] || [];
    }
}